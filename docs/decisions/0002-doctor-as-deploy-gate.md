# 0002. doctor を CI でなく公開前ゲートに置く

## 状態

有効

## 文脈

`cosense-site doctor` は公開 0 件・`.site` の `code:site.yaml` のパース失敗・
nav / home の参照切れ・slug 衝突を検出する。これらはどれも**今公開されているサイトより
悪いものを出す**状態にあたる。

素直に考えれば CI (`ci.yml`) の必須チェックに置きたくなる。だが doctor の fail 条件は
**ほとんどが Cosense 側の編集起因**で、PR のコード変更とは独立に赤くなる。theme の
CSS を 1 行直しただけの PR が、誰かが Cosense でページを下書きに戻したせいで赤くなる。
「無関係な PR が赤い」が常態になると、チェックを置く意味そのものが失われる。

## 決定

doctor は 2 箇所で走らせ、**PR を止めるのは片方だけにしない**:

- `ci.yml` — `continue-on-error: true` で結果をログに残すだけ。PR は落とさない
- `deploy.yml` — ビルドの後・公開の前に挟み、**fail なら公開しない**

検査するのはコンテンツなので、ゲートは**コンテンツを公開する経路**の側に置く。

## 影響

- ゲートが止めたときに起きるのは「サイトが消える」ではなく「**直前のデプロイが
  配信され続ける**」。Cosense 側を直せば次の cron で自動的に復帰する
- 止まったことに気付けるよう、失敗した run は `deploy-blocked` ラベルの Issue を
  1 件だけ起票する。**直したらその Issue を close する** (open のままだと次の失敗が
  起票されず、二度目以降に気付けなくなる)
- warn 止まりの項目 (broken link) は exit code に影響しないのでゲートには入らない
- 承知のうえで公開したいときは `gh workflow run "deploy website" -f skip_doctor=true`
- 副作用として、**CI の必須チェックに doctor を含めない**方針が決まった。この方針は
  リポジトリ側のマージ保護 (required status checks) の設計にも効く
