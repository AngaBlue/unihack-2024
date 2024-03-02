export default function About() {
    return (
        <div className='flex flex-col items-center min-h-full p-6'>
            <div className='max-w-6xl w-full'>
                <h1 className='text-4xl font-bold'>About</h1>
                <h2 className='text-2xl font-bold'>Technologies</h2>
                <p>
                    InstructAR works with Meta Quest 3 headsets to stream a realtime view of the headset&apos;s cameras to the browser via
                    forwarding Node.js server.
                </p>
            </div>
        </div>
    );
}
