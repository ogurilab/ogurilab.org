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

トップページの構成はシンプルに 3 つだけです —— **見出し（研究室名＋リード）／写真のモザイク／News 一覧**。
写真のモザイクがこのページで画像を見せる唯一の場所で、`Gallery` に貼った枚数だけ自動でタイル化されます。

### 画像の集め方（上から優先）

| 優先 | 貼る場所 | 用途 |
|---|---|---|
| 1 | `Gallery` ページ | モザイクの写真 |
| 2 | ホームページ（`.site` の `home.page` = `Welcome`） | 同上（`Gallery` に足す形で先に並ぶ） |
| 3 | `#news` 記事の1枚目の画像 | 上2つの合計が3枚未満のときだけ使う自動フォールバック |

キュレーションした写真（1・2）が **3枚以上あれば、それだけで**モザイクを組みます（ニュース画像は混ぜません）。
足りないときだけニュースの画像で埋めます。**雰囲気写真を6〜9枚ほど `Gallery` に貼る**のが想定運用です。

- `Gallery` ページには **`#publish` が必要**です（付けないと取り込まれません）。付けると `/Gallery` も公開ページになります。
- モザイクは 5枚ごとに 1枚を大きなタイルにして並べます。トリミングは 3:2 の横位置。**被写体が中央寄り**の写真が向きます（スライドのスクショは字が切れるので不向き）。
- 画像にリンクを張りたいときは `[https://gyazo.com/<id> https://…]`。タイルがそのままリンクになり、ホバーでキャプション（リンクテキスト）が出ます。
- Gyazo は同じ画像を任意の幅で配信するので、テーマ側が `srcset`（480 / 960 / 1600px）を自動生成します。**原寸のまま貼って構いません**。

### `.site` の `code:site.yaml` で調整できるもの

```yaml
gallery:             # 写真ページの名前を変えたいとき（既定は Gallery）
  page: Photos
posts:
  limit: 5           # トップの News 一覧の件数
```
