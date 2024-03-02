import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'InstructAR',
    description: 'Bridge Your Worlds: Stream, Mark, and Transform Reality with InstructAR'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang='en'>
            <head>
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
                <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#112c4a' />
                <meta name='msapplication-TileColor' content='#112c4a' />
                <meta name='theme-color' content='#112c4a' />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
