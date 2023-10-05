import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png' />
          <meta name='theme-color' content='#fff' />
          <meta name="google-site-verification" content="FVAX5JklJWRM_ZrOIFKFA3vD67ei63k0uFI6MmZeqJk" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
