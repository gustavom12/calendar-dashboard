import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css?family=Mukta:300,400,500,700,800&display=swap"
            rel="stylesheet"
          />
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9JHUyupozNNbADOmNQzFSSMoAheekvGM&callback=initMap&v=weekly&libraries=places"
            async
          />
        </Head>
        <body className="font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
