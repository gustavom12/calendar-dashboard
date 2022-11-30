import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Mukta:300,400,500,700,800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div className="flex">
            <div className="w-[7%]">aca va un menú</div>
            <div className="w-[93%]">
              <Main />
              <NextScript />
            </div>
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
