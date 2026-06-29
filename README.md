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
- スマホで見やすいレスポンシブ設計

## 技術構成

- 静的HTML
- CSS
- JavaScript
- WebP画像

Cloudflare Pagesでの公開を想定しています。公開ディレクトリはこのリポジトリのルートです。

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

- `https://lin.ee/xxxxxxxx`: 公式LINE URL
- `info@example.com`: 問い合わせ先メールアドレス
- `https://nicotto-fukuoka.pages.dev`: 本番ドメイン

## 主なファイル

- `index.html`
- `baby-sitter/index.html`
- `meal-prep/index.html`
- `pricing/index.html`
- `contact/index.html`
- `assets/styles.css`
- `assets/site.js`
- `sitemap.xml`
- `robots.txt`
- `nicotto-wireframe-5pages.png`

## 参考

- 既存公式サイト: https://babysitter-nicotto.studio.site/
- Instagram: https://www.instagram.com/nicotto_fukuoka/
