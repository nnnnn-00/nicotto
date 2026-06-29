# nicotto公式ホームページ制作メモ

## 概要

ベビーシッター＋料理代行サービス「nicotto」の公式ホームページ制作。

目的は、福岡市周辺の子育て世代からベビーシッター・料理代行の相談や問い合わせを増やすこと。

## 参考

- 既存公式サイト: https://babysitter-nicotto.studio.site/
- Instagram: https://www.instagram.com/nicotto_fukuoka/

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
- 画像を多めに配置し、1セクション1画像または1カード1画像の見せ方にする
- スマホで見やすい構成

## ワイヤーフレーム

確認用の簡易モノクロワイヤーフレームを作成済み。

- `nicotto-wireframe-5pages.png`

## 実装内容

静的HTML/CSS/JavaScriptで作成。

Cloudflare Pagesで公開しやすいよう、`outputs` フォルダ内だけで完結する構成。

### 主なファイル

- `index.html`
- `baby-sitter/index.html`
- `meal-prep/index.html`
- `pricing/index.html`
- `contact/index.html`
- `assets/styles.css`
- `assets/site.js`
- `sitemap.xml`
- `robots.txt`

## 画像

サイト用に以下の画像を追加。

- `assets/nicotto-hero.webp`
- `assets/sitter-reading.webp`
- `assets/pickup-support.webp`
- `assets/meal-prep-food.webp`
- `assets/contact-consult.webp`

## SEO対応

- 各ページに個別title
- 各ページにmeta description
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
- WebP画像による軽量化

## 料金反映

既存公式サイトの情報を反映。

### ベビーシッター

- 初回事前面談: 1,500円
- 単発依頼: 2,200円/1時間
- 定期依頼: 1,800円/1時間
- 病児保育: +500円/1時間
- 病後児保育: +300円/1時間
- 早朝・深夜: 基本料金+25%
- 兄弟利用追加料金
- シッターチケット
- 送迎チケット

### 料理代行

- 初回お試しプラン: 4,980円
- 基本プラン: 2時間 5品保証 5,980円〜
- 作り置き、下味冷凍、離乳食、幼児食、アレルギー対応

## 公開前に差し替える項目

- `https://lin.ee/xxxxxxxx` を公式LINE URLへ変更
- `info@example.com` を問い合わせ先メールアドレスへ変更
- `https://nicotto-fukuoka.pages.dev` を本番ドメインへ変更

## ローカルプレビュー

`outputs` フォルダで静的サーバーを起動。

```bash
python -m http.server 8787
```

ブラウザで以下を開く。

```text
http://127.0.0.1:8787/
```

## 確認済み

- PC/スマホで横スクロールなし
- 全ページh1は1つ
- 文字化けなし
- 画像表示確認済み
- 画像はWebP優先

