import Link from 'next/link';
import { Input } from '@web/components/ui/input';
import { Button } from '@web/components/ui/button';
import { SVGProps } from 'react';

export default function Page() {
    return (
        <div className='flex flex-col min-h-[100dvh]'>
            <header className='px-4 lg:px-6 h-14 flex items-center'>
                <Link className='flex items-center justify-center' href='#'>
                    <MountainIcon className='h-6 w-6' />
                    <span className='sr-only'>InstructAR</span>
                </Link>
                <nav className='ml-auto flex gap-4 sm:gap-6'>
                    <Link className='text-sm font-medium hover:underline underline-offset-4' href='#'>
                        Features
                    </Link>
                    <Link className='text-sm font-medium hover:underline underline-offset-4' href='#'>
                        Pricing
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
            <main className='flex-1'>
                <section className='w-full py-6 md:py-12 lg:py-16 xl:py-20'>
                    <div className='container flex flex-col items-center justify-center px-4 space-y-4 md:px-6'>
                        <div className='space-y-2 text-center'>
                            <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>InstructAR</h1>
                            <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                                Bridge Your Worlds: Stream, Mark, and Transform Reality with InstructAR
                            </p>
                        </div>
                        <div className='mx-auto w-full max-w-prose aspect-video overflow-hidden rounded-xl shadow-video'>
                            <div />
                        </div>
                    </div>
                </section>
                <section className='w-full py-6 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800'>
                    <div className='container flex flex-col items-center justify-center px-4 space-y-4 md:px-6'>
                        <div className='space-y-2 text-center'>
                            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>How it works</h2>
                            <p className='max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                                InstructAR revolutionizes interaction between virtual and physical realms. Our platform streams live camera
                                feeds directly to a website, where users can engage in real-time. With a simple click, users on the website
                                can place interactive indicators on the stream. These markers then seamlessly appear in the user's VR
                                passthrough feed, overlayed via augmented reality. This integration allows for an unprecedented level of
                                collaboration and interaction, enabling users to guide, instruct, or interact with the physical environment
                                from a remote location. Whether for educational purposes, remote assistance, or interactive presentations,
                                InstructAR brings a new dimension to live streaming and augmented reality.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='w-full py-6 md:py-12 lg:py-16'>
                    <div className='container flex flex-col items-center justify-center px-4 space-y-4 md:px-6'>
                        <div className='space-y-2 text-center'>
                            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>AR Interaction</h2>
                            <p className='max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                                Place markers on the livestream and see them appear in your VR passthrough feed in real-time.
                            </p>
                        </div>
                        <div className='mx-auto w-full max-w-prose aspect-video overflow-hidden rounded-xl border'></div>
                    </div>
                </section>
                <section className='w-full py-6 md:py-12 lg:py-16 border-t'>
                    <div className='container flex flex-col items-center justify-center space-y-4 px-4 md:px-6'>
                        <div className='space-y-2 text-center'>
                            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Sign up for early access</h2>
                            <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                                Be the first to experience VR Live. Sign up to get notified when we launch.
                            </p>
                        </div>
                        <div className='mx-auto w-full max-w-[400px] space-y-2'>
                            <form className='grid gap-2'>
                                <Input className='w-full' placeholder='Enter your email' type='email' />
                                <Button className='w-full' type='submit'>
                                    Sign Up
                                </Button>
                            </form>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                Sign up to get notified when we launch.
                                <Link className='underline underline-offset-2' href='#'>
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
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
        </div>
    );
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
        </svg>
    );
}
