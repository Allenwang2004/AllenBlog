import { Head, Html, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Archivo carries a width axis (used for the wordmark and display
            type), Source Serif 4 sets long-form prose, IBM Plex Mono is
            reserved for measurements and code. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,300..600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="overflow-x-hidden bg-paper text-gray-900 antialiased transition-colors dark:bg-gray-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
