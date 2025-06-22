# pN-blog-hub

チームのためのブログスターターTeam Blog Hubを利用して作成された primeNumber Inc. の非公式ファンサイトです。
何かあれば Issue を作成してください。

https://pn-blog-hub.pages.dev/

## メンバー追加

- `members.ts` に追加したいメンバーの情報を記載してください。 (以下、コピペ用)
  - `sources` にはRSSがある媒体であれば追加可能です。
  - 「追加したいけどいじるのわからん、こわい」などがあればissueを作成するか、Slackで連絡してください。
- 画像を変えたい場合は `avatarSrc` の変更と、`public/avatars/` からの削除を行うPull Requestを出してください。

```javascript
  {
    id: "tk3fftk",
    name: "Hiroki Takatsuka",
    role: "",
    bio: "",
    avatarSrc:
      "https://pbs.twimg.com/profile_images/1696407915555688448/wPADdvGj_400x400.jpg",
    sources: [
      "https://zenn.dev/tk3fftk/feed",
      "https://note.com/tk3fftk/rss",
      "https://qiita.com/tk3fftk/feed",
      "https://speakerdeck.com/tk3fftk.rss",
    ],
    twitterUsername: "tk3fftk",
    githubUsername: "tk3fftk",
  }
```

## Development

```bash
npm i
npm run preview
```

- サイトの基本設定は`site.config.ts`で行います。
- メンバーのプロフィールやRSSの登録は`members.ts`で行います。
- 配色を変更するには`src/styles/variables.scss`を書き換えます。
- ロゴなどの画像を変更するには`public`内のファイルを置き換えます。

## Deployment

tk3fftkのCloudflare Pagesにホスティングしています。

## 利用したテンプレート

以下、利用したテンプレートの文言をそのまま残しています

![Demo](https://user-images.githubusercontent.com/34590683/96832331-8c289400-1479-11eb-9466-f24d30860a24.png)

企業/チームのためのブログ・スターターです。Forkしてご自由にお使いください。

ブログのRSSのURLを登録することで、チームメンバーの投稿を一覧にまとめて表示します。Zenn、Qiita、Medium、note、はてなブログなど、RSSフィードを取得できるサイトであれば、メンバーは好きな場所に投稿できます。

詳しくは下記の記事をご覧ください。

[チーム個々人のテックブログをRSSで集約するサイトを作った →](https://zenn.dev/catnose99/articles/cb72a73368a547756862)

## Demo
https://team-blog-hub.vercel.app

## Licence
MIT
