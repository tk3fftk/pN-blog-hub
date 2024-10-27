import Document, { Html, Head, Main, NextScript } from "next/document";
import { config } from "@site.config";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon shortcut"
            type="image/png"
            href={`${config.siteRoot}/logo.png`}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@200..500&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
