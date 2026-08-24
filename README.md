# ogurilab.org

[cosense-site-kit](https://github.com/shinyaoguri/cosense-site-kit) で生成する ogurilab の研究室サイト。
コンテンツは [Cosense](https://scrapbox.io)（旧 Scrapbox）で執筆し、`#publish` を付けたページが公開されます。

- **データソース**: Cosense プロジェクト（`cosense.config.ts` の `source.project`）
- **テーマ**: `theme/`（cosense-theme-lab をこのリポジトリに vendoring。編集自由。フレームワーク `@cosense-site-kit/*` のみ npm 由来）
- **デプロイ**: Cloudflare Pages（プロジェクト `ogurilab-org` + 独自ドメイン ogurilab.org）。`.github/workflows/deploy.yml` が cron で再フェッチ→ビルド→公開。
  Cloudflare 側の Git 連携によるビルドは**意図的に無効化**している（`deployments_enabled: false`）。Cosense の編集は git のコミットを生まないため push 起点のビルドでは記事の更新を拾えず、定期実行できる Actions 側に公開経路を一本化している。再有効化すると公開経路が二重になるので注意。

### スケジュール実行の維持

GitHub は**リポジトリに 60 日間アクティビティが無いとスケジュール実行を自動で無効化**する。ワークフローの実行自体は活動に数えられない。このサイトはコンテンツを Cosense に置くため、記事を書いてもコミットが生まれず、放置すると cron が止まる（実際に 292 日間止まっていた）。

対策として `deploy.yml` が月に一度だけ `.github/last-deploy.json` を更新してコミットし、リポジトリを活動状態に保っている。ログに現れる `chore: 稼働記録を更新する (YYYY-MM)` はこの仕組みによるもの。

止まってしまった場合、`gh workflow enable "deploy website"` は**名前解決に失敗して黙って何もしない**（`state` は `active` を返すのに実体は無効のままで、dispatch してもジョブが 0 件のまま滞留する）。**ID 指定で有効化すること**。

```bash
gh api -X PUT repos/ogurilab/ogurilab.org/actions/workflows/99228705/enable
```


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

## テンプレート

ページごとの見せ方は `theme/templates/` が持ちます。`.site` の `templates:` マッピングか、
Cosense ページの `#template/<名前>` タグで割り当てます。

| テンプレート | 用途 |
|---|---|
| `page` | 既定。ふつうの記事 |
| `sections` | セクションを積み上げた案内ページ（About / Research など）→ [書き方](./docs/sections-template.md) |
| `members` | `code:members.yaml` からのメンバー一覧 |
| `publications` | `code:publications.yaml` からの論文一覧 |

## トップページ（一画面のハブ）

トップは **スクロールしない 1 画面** で、研究室名＋ミッションを示し、各ページ（About / News / Members / Publications / Contact / Join）へ振り分けるだけの入口です。詳しい内容は各ページが持ちます。

- 背景は GPU 描画の生成的フィールド（自作 WebGL シェーダー、`components/ShaderHero.astro`）。カーソルに反応し、非対応環境・省データ・`prefers-reduced-motion` では静止にフォールバックします。
- 見出し下の一文（ミッション）は **ホームページ（`.site` の `home.page` = `Welcome`）の最後の段落**を自動表示します。差し替えたいときは `Welcome` を編集してください。
- 下部の行き先カードは **ナビ（`.site` の `nav`）と同じ並び**です。順番やラベルはナビを直せば連動します。

### Join（学生の方へ）を出すには

`Join` というタイトルのページを作り `#publish` を付けると、行き先に **Join** カードが自動で増えます（配属を考える学生・大学院志望・見学歓迎などの内容を想定）。別タイトルにしたいときは `.site` の `code:site.yaml` で:

```yaml
join:
  page: 学生の方へ     # 既定は Join
```

> 写真ページ（`Gallery`）や「主な研究・作品」ショーケースは、以前の版でトップに載せていましたが、1 画面ハブ化に伴いトップからは外しました（各ページ側で活用できます）。
