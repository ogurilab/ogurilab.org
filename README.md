# ogurilab.org

[cosense-site-kit](https://github.com/shinyaoguri/cosense-site-kit) で生成する ogurilab の研究室サイト。
コンテンツは [Cosense](https://scrapbox.io)（旧 Scrapbox）で執筆し、`#publish` を付けたページが公開されます。

- **データソース**: Cosense プロジェクト（`cosense.config.ts` の `source.project`）
- **テーマ**: `theme/`（cosense-theme-lab をこのリポジトリに vendoring。編集自由。フレームワーク `@cosense-site-kit/*` のみ npm 由来）
- **デプロイ**: Cloudflare Pages（プロジェクト `ogurilab-org` + 独自ドメイン ogurilab.org）。`.github/workflows/deploy.yml` が cron で再フェッチ→ビルド→公開。

## 開発

```bash
npm install
npm run fetch   # Cosense からページ取得 → .cosense-cache/
npm run dev     # http://localhost:4321
```

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバ |
| `npm run fetch` | Cosense から再フェッチ |
| `npm run build` | fetch + `astro build` → `dist/` |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run validate` | 中間データの検証 |
| `npm run doctor` | 公開前チェック（参照切れ・draft漏れ等） |
