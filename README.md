# nicotto公式ホームページ

ベビーシッター＋料理代行サービス「nicotto」の公式ホームページです。

福岡市周辺の子育て世代に向けて、ベビーシッターと料理代行の相談・問い合わせを増やすことを目的に制作しています。

## プレビュー

ローカルで確認する場合は、このディレクトリで静的サーバーを起動します。

```bash
python -m http.server 8787
```

ブラウザで開くURL:

```text
http://127.0.0.1:8787/
```

## ページ構成

- トップページ
- ベビーシッターページ
- 料理代行ページ
- ご利用料金ページ
- お問い合わせページ

## デザイン方針

- 既存公式サイトのやさしい雰囲気を継承
- ベビーシッターは淡いピンク
- 料理代行はクリームイエロー
- 共通部分は白・アイボリー・ベージュ
- LINE相談ボタンは緑で目立たせる
- 1セクション1画像、または1カード1画像の見せ方
- 表示画像は同じ画像を使い回さず、全54箇所を固有画像で構成
- スマホで見やすいレスポンシブ設計

## 技術構成

- 静的HTML
- CSS
- JavaScript
- WebP画像

GitHub Pagesでの公開を想定しています。公開ディレクトリはこのリポジトリのルートです。

公開URL:

```text
https://nnnnn-00.github.io/nicotto/
```

GitHub Pagesの設定:

1. GitHubのリポジトリ設定で `Settings` → `Pages` を開く
2. `Build and deployment` の `Source` を `Deploy from a branch` にする
3. `Branch` を `main`、フォルダを `/ (root)` にする
4. `Save` して数分待つ

## SEO対応

- 各ページ個別のtitle
- 各ページ個別のmeta description
- h1は各ページ1つ
- OGP設定
- canonical設定
- sitemap.xml
- robots.txt
- パンくずリスト
- FAQ構造化データ
- LocalBusiness構造化データ
- 画像alt
- スマホ最適化

## 公開前に差し替える項目

以下は仮の値です。公開前に実際の情報へ差し替えてください。

- `https://line.me/R/ti/p/@788kxjco`: 公式LINE URL
- `info@example.com`: 問い合わせ先メールアドレス
- `https://nnnnn-00.github.io/nicotto/`: GitHub Pages公開URL。独自ドメインを使う場合は差し替えてください。

## 主なファイル

- `index.html`
- `baby-sitter/index.html`
- `meal-prep/index.html`
- `pricing/index.html`
- `contact/index.html`
- `assets/styles.css`
- `assets/site.js`
- `assets/unique/`
- `sitemap.xml`
- `robots.txt`
- `nicotto-wireframe-5pages.png`

## 参考

- 既存公式サイト: https://babysitter-nicotto.studio.site/
- Instagram: https://www.instagram.com/nicotto_fukuoka/
