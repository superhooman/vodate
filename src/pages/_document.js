import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="ru">
                <Head>
                    <base href="/" />
                    <meta name="color-scheme" content="light dark" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-title" content="VoDate" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                </Head>
                <body className="bg-white dark:bg-black text-gray-800 dark:text-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
