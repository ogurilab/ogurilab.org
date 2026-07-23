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

## トップページの写真（Cosense 側の運用）

トップの写真はすべて **Cosense に Gyazo で貼った画像** から自動で組まれます。リポジトリの編集は不要です。

貼り方は Cosense の通常の記法どおり、行に `[https://gyazo.com/<id>]` を置くだけ。
Gyazo は同じ画像を任意の幅で配信するので、テーマ側が `srcset`（480 / 960 / 1600px）を自動生成します。**原寸のまま貼って構いません**。

### 画像の集め方（上から優先）

| 優先 | 貼る場所 | 用途 |
|---|---|---|
| 1 | ホームページ（`.site` の `home.page` = `Welcome`） | ヒーローの写真 |
| 2 | `Gallery` ページ | ヒーローの不足分 + 下部の写真帯 |
| 3 | `#news` 記事の1枚目の画像 | 上2つが足りないときの自動フォールバック |

集まった順に **先頭5枚がヒーローのコラージュ**、**6枚目以降が下部の横スクロール写真帯**（3枚以上あるとき表示）になります。
つまり「雰囲気写真を8枚くらい `Gallery` に貼る」だけでトップ全体が写真で埋まります。

- `Gallery` ページには **`#publish` が必要**です（付けないと取り込まれません）。付けると `/Gallery` も公開ページになります。
- ヒーローは 4:5（3枚目ごとに 1:1）にトリミングされます。**顔や被写体が中央寄り**の写真が向きます。スライドのスクリーンショットは字が切れるので不向きです。
- 画像にリンクを張りたいときは `[https://gyazo.com/<id> https://…]`。ホーム側でもリンク付き写真になります。

### `.site` の `code:site.yaml` で調整できるもの

```yaml
featured:            # トップの「Featured」カード（最大3件、カバー画像は各ページの1枚目）
  - 東京ゲームショウ2025に出展しました（2025-09-25）
  - 水引アート制作支援システム
gallery:             # 写真ページの名前を変えたいとき（既定は Gallery）
  page: Photos
posts:
  limit: 5           # トップの Recent news の件数
```
