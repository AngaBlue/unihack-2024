import EnterCode from '@web/components/EnterCode';

export default function Page() {
    return (
        <>
            <section
                className='w-full py-6 md:py-12 lg:py-16 xl:py-20 animate-in fade-in-0 slide-in-from-top-32 duration-1000 min-h-[calc(100vh-56px)] flex flex-col justify-center'
                style={{
                    backgroundImage: 'radial-gradient(lightgray 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            >
                <div className='container flex items-center justify-between px-4 space-y-4 md:px-6 max-w-6xl h-full'>
                    <div className='space-y-2 text-left'>
                        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>InstructAR</h1>
                        <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                            Bridge Your Worlds: stream, mark, and transform reality with InstructAR
                        </p>
                    </div>
                    <div className='h-96 max-w-prose overflow-hidden rounded-xl shadow-video'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src='./logo.svg' alt='logo' className='h-full' />
                    </div>
                </div>
            </section>
            <section className='w-full py-6 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800' id='how-it-works'>
                <div className='container flex flex-col items-center justify-center px-4 space-y-4 md:px-6 max-w-6xl'>
                    <div className='space-y-2 text-center'>
                        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>How it works</h2>
                        <p className='text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                            InstructAR revolutionizes interaction between virtual and physical realms. Our platform streams live camera
                            feeds directly to a website, where users can engage in real-time. With a simple click, users on the website can
                            place interactive indicators on the stream. These markers then seamlessly appear in the user&apos;s VR
                            passthrough feed, overlayed via augmented reality. This integration allows for an unprecedented level of
                            collaboration and interaction, enabling users to guide, instruct, or interact with the physical environment from
                            a remote location. Whether for educational purposes, remote assistance, or interactive presentations, InstructAR
                            brings a new dimension to live streaming and augmented reality.
                        </p>
                    </div>
                </div>
            </section>
            <section className='w-full py-6 md:py-12 lg:py-16 border-t' id='enter-steam-code'>
                <div className='container flex flex-col items-center justify-center space-y-4 px-4 md:px-6'>
                    <div className='space-y-2 text-center'>
                        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Enter Stream Code</h2>
                        <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                            Enter a stream code to join a live stream and interact with the physical environment in real-time.
                        </p>
                    </div>
                    <div className='mx-auto w-full max-w-[400px] space-y-2'>
                        <EnterCode />
                    </div>
                </div>
            </section>
            <section className='w-full py-6 md:py-12 lg:py-16 bg-gray-100'>
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
        </>
    );
}
