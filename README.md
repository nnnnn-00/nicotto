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
- nicottoだより（記事一覧と既存の記事）
- お問い合わせページ

## デザイン方針

- 既存公式サイトのやさしい雰囲気を継承
- ベビーシッターは淡いピンク
- 料理代行はクリームイエロー
- 共通部分は白・アイボリー・ベージュ
- LINE相談ボタンは既存HPのパステルグラデーションと茶色文字で統一
- 1セクション1画像、または1カード1画像の見せ方
- 承認デザインの主要7ページでは6枚の写真を重複せず使用
- その他の記事本文と既存画像は維持
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

- LINEは既存の `https://line.me/R/ti/p/@788kxjco` を維持
- フォームは既存の Formspree 接続先を維持（実際の受信確認は運営者側で実施）
- `https://nnnnn-00.github.io/nicotto/`: GitHub Pages公開URL。独自ドメインを使う場合は差し替えてください。

## 主なファイル

- `./`
- `baby-sitter/./`
- `meal-prep/./`
- `pricing/./`
- `contact/./`
- `assets/styles.css`
- `assets/site.js`
- `assets/unique/`
- `sitemap.xml`
- `robots.txt`
- `nicotto-wireframe-5pages.png`

## 参考

- 既存公式サイト: https://babysitter-nicotto.studio.site/
- Instagram: https://www.instagram.com/nicotto_fukuoka/

## 2026年10月の承認デザイン反映

トップ・ベビーシッター・料理代行・料金・相談・nicottoだより・夜間記事の7ページに承認デザインを反映しています。共有ヘッダー・フッターは全ページで統一し、グローバルナビはPC・スマホともハンバーガーメニューです。Instagramと相談アイコンはヘッダーから直接使えます。

- `assets/approved-design.css`: 元のHPの配色・フォントを引き継いだスタイル
- `assets/approved-design.js`: メニュー開閉、料金・相談タブ、カテゴリ絞り込み、サービスの引き継ぎ
- `assets/approved/`: 主要ページで使う軽量写真とLucideのライセンス
- LINEボタンは公式LINEへ直接移動します。
- フォームは必須4項目、年齢はベビーシッター・両方を選んだ場合のみ表示します。
- 送信を受け付けた場合だけ `contact_form_submit` を記録します。送信失敗時は入力を維持します。
- JavaScriptが無効でもナビ・全料金・両相談方法を読めます。

フォームの成功・受信エラー・通信エラーを、外部送信なしで確認できます。

```bash
node --test tests/contact-form.test.cjs
```

現在は `.github/workflows/deploy.yml` により main への変更がCloudflare Workersへ自動公開される設定です。デザイン変更はPRで確認してから反映してください。公開パス（拡張子なし）と既存のcanonical・リダイレクトを維持しています。
