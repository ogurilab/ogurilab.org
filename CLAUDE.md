# CLAUDE.md

ogurilab.org 固有の文脈だけを書く。開発フローと共通規約はグローバル CLAUDE.md、
サイトの構成と運用手順は [README.md](./README.md) が正本。設計判断の経緯は
[docs/decisions/](./docs/decisions/) を読む。

## このリポの非自明なところ

- **コンテンツはこのリポに無い**。本文は Cosense (旧 Scrapbox) にあり、`#publish` を
  付けたページが公開される。**記事を書いてもコミットは生まれない**ため、「push が無い =
  更新が無い」は成り立たない。表示の不具合を追うときは、まず Cosense 側の編集で直る
  ものか theme/ の修正が要るものかを切り分ける
- **公開経路は `.github/workflows/deploy.yml` の cron 一本**。Cloudflare 側の Git 連携は
  意図的に無効 (`deployments_enabled: false`)。再有効化すると経路が二重になる
- **`theme/` は cosense-theme-lab からの vendoring** で、編集して構わない。npm 由来なのは
  `@cosense-site-kit/*` のフレームワークだけ
- **`.github/last-deploy.json` を更新する `chore: 稼働記録を更新する (YYYY-MM)` コミットは
  自動生成**。GitHub が 60 日無活動で cron を止めるのを防ぐためのもので、手で消したり
  内容を当てにしたりしない (実際に 292 日止まった経緯がある)

## 検証コマンド

```bash
npm run build     # fetch + astro build。まずこれが通ることを確認する
npm run doctor    # 公開前ゲートと同じ検査 (公開 0 件・参照切れ・slug 衝突)
npm run validate  # 中間データの検証
```

`npm run doctor` の fail はコード変更と無関係に Cosense 側の編集起因で出ることが多い。
CI (`ci.yml`) が doctor で PR を落とさないのはこのため。**公開を止めるゲートは
`deploy.yml` 側**にあり、そちらは fail で公開しない。

`npm run dev` は常駐するので、エージェントが検証目的で起動しない (ビルドで足りる)。

## 見た目を変えたときの証跡

`theme/` (とくに `theme/components/`)・CSS・トップページの構成を触った PR は、
**本文に before / after の画像を貼る**。動きが変わるもの (ShaderHero のアニメーション、
カーソル反応、フォールバック挙動) は静止画では正誤を判定できないので **アニメーション
WebP** を添える。

画像は**リポジトリにコミットせず Gyazo へ上げて URL を貼る** (撮り方と貼り方は
gyazo-capture スキル)。CI での強制は入れていない — このリポは「コード変更と独立に
赤くなるチェックで PR を止めない」方針を取っており (README の CI 節)、証跡の有無で
落とすジョブはその方針と噛み合わないため、運用で担保する。

## Issue の扱い

`deploy-blocked` ラベルの Issue は deploy.yml が自動起票する。**直したら close する**
(open のままだと次の失敗が起票されず、止まったことに気付けなくなる)。
