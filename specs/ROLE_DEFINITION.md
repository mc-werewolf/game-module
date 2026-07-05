# werewolf-module — 役職定義 API

## 目的

役職アドオン（vanilla-pack, additional-roles-*）が毎回同じ boilerplate を
書かずに済むよう、役職定義と kairo-router 連携を自動化するライブラリ。

---

## 使い方（役職アドオン側）

```typescript
import { defineRoles } from "@mc-werewolf/module";
import { router } from "@kairo-js/router";

const roles = defineRoles([
    { id: "seer",     name: "占い師", team: "village", ... },
    { id: "werewolf", name: "人狼",   team: "werewolf", ... },
]);

// これだけで startup / addonActivate に必要な処理が全部登録される
roles.register(router);
```

---

## defineRoles が自動でやること

### startup フェーズ

1. game-manager への役職データ登録 API フックを宣言
2. 役職ごとの addonEvents を kairo に宣言（後述）

### addonActivate フェーズ

1. `router.request("werewolf-gamemanager", "werewolf:registerRole", roleData)` を呼ぶ
2. 役職スキル発動イベントのハンドラを設定

---

## 役職ごとに自動生成される addonEvents

役職アドオンを**さらに改造したいアドオン**が、個別役職のイベントを購読できる。

| イベント名            | タイミング               |
|----------------------|------------------------|
| `role:{id}:die`      | その役職のプレイヤーが死亡 |
| `role:{id}:activate` | スキルを使用した         |
| `role:{id}:assign`   | 役職がアサインされた      |

```typescript
// 占い師をさらに改造したいアドオン（startup 内）
ev.addonEvents.on("werewolf-additionalroles-1", "role:seer:die", (payload) => {
    // 占い師死亡時の追加処理
});
```

役職アドオンは「後方アドオンのことを考えて作る」必要がなく、
`defineRoles` が自動でイベント生成・emit のフックを仕込む。

---

## 役職定義スキーマ（暫定）

```typescript
type RoleDefinition = {
    id: string;
    name: string;
    team: "village" | "werewolf" | "neutral";
    description?: string;
    skill?: {
        item: string;           // スキル発動アイテム (例: "minecraft:compass")
        cooldown?: number;      // tick 単位
        targetType: "player" | "none";
        onActivate: (ctx: SkillContext) => void | Promise<void>;
    };
};
```

---

## 騎士の実装例

騎士のフラグ（死亡保護）は騎士自身が管理する。
game-manager の `werewolf:killPlayer` に hook を差し込む処理も
`defineRoles` が自動生成する（`onKillHook` フィールドで定義）。

```typescript
defineRoles([{
    id: "knight",
    name: "騎士",
    team: "village",
    skill: {
        item: "minecraft:shield",
        targetType: "player",
        onActivate: (ctx) => {
            ctx.setFlag(ctx.targetPlayerId, "knight:protect");
        },
    },
    onKillHook: (ctx) => {
        // werewolf:killPlayer の before hook として自動登録される
        if (ctx.hasFlag(ctx.args.playerId, "knight:protect")) {
            ctx.clearFlag(ctx.args.playerId, "knight:protect");
            ctx.cancel({ protected: true });
        }
    },
}]);
```
