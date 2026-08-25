# CONTRIBUTING

ogurilab の研究室サイトです。内容の追加・修正は **多くの場合このリポジトリを
触らずに済みます** — 先に下の「まず確かめること」を読んでください。

## まず確かめること: どこを直すのか

本文は Cosense (旧 Scrapbox) にあり、`#publish` を付けたページが公開されます。

| 直したいもの | どこを触るか |
|---|---|
| 記事の文章・写真・メンバーや論文の一覧 | **Cosense 側のページ**。このリポの変更は不要 (次の cron で反映) |
| ナビの並び・トップの見せ方の設定 | Cosense の `.site` ページ (`code:site.yaml`) |
| 見た目 (レイアウト・配色・コンポーネント) | このリポの `theme/` |
| 公開の仕組み・CI | このリポの `.github/workflows/` |

反映は 12 時間ごとの cron です。急ぐときは `gh workflow run "deploy website"`。

## 開発

```bash
npm install
npm run fetch   # Cosense からページ取得 → .cosense-cache/
npm run dev     # http://localhost:4321
```

コマンド一覧は [README.md](./README.md#コマンド) にあります。

## 変更を出すまで

main が唯一の長命ブランチです (GitHub Flow)。

1. main から `<type>/<短い説明>` のブランチを切る
2. 小さく作る。1 PR = 1 関心事。本題以外の気付きは直さず Issue に起票する
3. 手元で検証する

   ```bash
   npm run build
   npm run doctor
   ```

4. PR を出す (作りかけなら Draft)。テンプレートの目的・変更点・確認方法を埋める

   - **タイトルは Conventional Commits**: `<type>(<scope>): <要約>`
     type は `feat` / `fix` / `docs` / `refactor` / `test` / `chore` / `ci` / `perf` / `build`。
     squash merge でこのタイトルがそのままコミット履歴になるため、CI (`pr-title`) が形式を検査します
   - **Issue を閉じるなら `Closes #N` は PR 本文に書く**。コミットメッセージ側に書いても
     squash では GitHub へ届きません
   - **見た目が変わるなら before / after の画像を貼る**。動きが変わるものはアニメーション WebP。
     画像はリポジトリにコミットせず外部 URL (Gyazo など) で貼ってください

5. CI (`ci`) が green になったら squash merge

## 設計判断を伴う変更

依存や公開経路、CI の方針を変えるときは [docs/decisions/](./docs/decisions/) に ADR を
1 件足してください (状態 / 文脈 / 決定 / 影響 の 4 節)。なぜそうしたのかは、コードを
読んでも復元できません。

## サイトが更新されなくなったら

`deploy.yml` の公開前ゲートが止めている可能性があります。`deploy-blocked` ラベルの
Issue を確認し、Cosense 側を直したらその Issue を **close** してください
(open のままだと次の失敗が起票されません)。詳しくは
[README.md](./README.md#公開前ゲート) を読んでください。
