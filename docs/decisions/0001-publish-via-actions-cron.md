# 0001. 公開経路を GitHub Actions の cron に一本化する

## 状態

有効

## 文脈

Cloudflare Pages は Git 連携でリポジトリへの push を起点にビルドできる。これが既定の
使い方で、設定も何もいらない。

しかしこのサイトの本文は Cosense (旧 Scrapbox) にあり、`#publish` を付けたページが
公開される。**記事を書いても git のコミットは生まれない**。push 起点のビルドは
「コードが変わったとき」しか走らないので、肝心の記事の更新をまったく拾えない。

## 決定

Cloudflare 側の Git 連携によるビルドを**意図的に無効化**する
(`deployments_enabled: false`)。公開は `.github/workflows/deploy.yml` が cron で
「再フェッチ → ビルド → doctor → 公開」を回す経路に一本化する。

## 影響

- 記事の更新は 12 時間ごとの cron で反映される。急ぐときは
  `gh workflow run "deploy website"` で手動実行する
- **Cloudflare 側の Git 連携を再有効化すると公開経路が二重になる**。同じサイトに
  二つの経路から別々の内容が配信されうるので、触らない
- ダッシュボード (Workers & Pages) には、この設定の反映として
  **「デプロイが一時停止されました」(Deployments paused)** がオレンジのアイコン付きで常時出る。
  Build > Branch control の「Enable automatic production branch deployments」がオフである、
  という意味の表示で、**正常な状態**。解除すると上記の二重経路になるので戻さない。
  公開の生死は Actions の `deploy website` 側で確認する
- 公開が Actions に載ったことで、公開の前に検査を挟めるようになった (→ [0002](./0002-doctor-as-deploy-gate.md))
- 一方で、リポジトリにコミットが生まれない状態が常態化した。これが cron 自体を
  止める問題を生んだ (→ [0003](./0003-heartbeat-commit-keeps-cron-alive.md))
