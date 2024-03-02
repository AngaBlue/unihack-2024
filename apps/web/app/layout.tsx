import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'InstructAR',
    description: 'Bridge Your Worlds: Stream, Mark, and Transform Reality with InstructAR'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang='en'>
            {/* Head */}
            <Head>
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
                <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#112c4a' />
                <meta name='msapplication-TileColor' content='#112c4a' />
                <meta name='theme-color' content='#112c4a' />
            </Head>
            {/* Content */}
            <body className={inter.className}>
                {/* Header */}
                <header className='px-4 lg:px-6 h-14 flex items-center'>
                    <Link className='flex items-center justify-center' href='/'>
                        <Image src={require('@web/images/logo.svg')} alt='InstructAR' width={32} height={32} />
                        <span className='font-bold ml-2'>InstructAR</span>
                    </Link>
                    <nav className='ml-auto flex gap-4 sm:gap-6'>
                        <Link className='text-sm font-medium hover:underline underline-offset-4' href='/#enter-steam-code'>
                            Enter Stream Code
                        </Link>
                        <Link className='text-sm font-medium hover:underline underline-offset-4' href='#'>
                            About
                        </Link>
                        <Link
                            className='text-sm font-medium hover:underline underline-offset-4'
                            href='https://github.com/AngaBlue/unihack-2024'
                        >
                            Source
                        </Link>
                    </nav>
                </header>
                {/* Main */}
                <div className='flex flex-col min-h-[100dvh]'>
                    <main className='flex-1'>{children}</main>
                </div>
                {/* Footer */}
                <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>© 2024 InstructAR. All rights reserved.</p>
                    <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
                        <Link className='text-xs hover:underline underline-offset-4' href='#'>
                            Terms of Service
                        </Link>
                        <Link className='text-xs hover:underline underline-offset-4' href='#'>
                            Privacy
                        </Link>
                    </nav>
                </footer>
            </body>
        </html>
    );
}
