export default function About() {
    return (
        <div className='flex flex-col items-center min-h-full p-6'>
            <div className='max-w-6xl w-full'>
                <h1 className='text-4xl font-bold'>About</h1>
                <h2 className='text-2xl font-bold'>Inspiration</h2>
                <p>
                    Over the last few years, remote and virtual collaboration [InstructAR](https://instructar.anga.dev) has exploded as we
                    open up industries to collaboration from around the world and become ever more concious the cost commuting and
                    long-distance travel has on our environment. We were inspired by the need to bridge the gap between virtual expertise
                    and physical application. We envisioned a tool that brings expert guidance directly to the field, no matter the
                    distance. For instance, a technician repairing airplane could receive real-time instructions and supervision from a
                    remote expert, with AR markers guiding the process. Or, surgeons or medical students could benefit from real-time,
                    AR-enhanced guidance during intricate and specialised procedures or training sessions.
                </p>
                <h2 className='text-2xl font-bold'>What is InstructAR</h2>
                <p>
                    InstructAR is an innovative VR app that streams live camera feeds from a VR headset to a website, allowing remote users
                    to place interactive AR markers in 3D space. These markers appear in real-time in a VR user&apos;s field of view,
                    guiding them through complex tasks with precision and ease.
                </p>
                <h2 className='text-2xl font-bold'>Technologies</h2>
                <p>
                    We built InstructAR using a combination of technologies and frameworks. The VR encoding and streaming uplink is powered
                    by Python with OpenCV and FFMPEG, while the AR overlay is implemented using Unity (C#) and native Meta Quest 3 APIs. The
                    front-end of the website was developed with TypeScript using Next.js (React), and the back-end integration was achieved
                    with Node.js running TypeScript behind Cloudflare and an NGINX reverse proxy. Each of these 4 applications communicates
                    with each via Socket.IO except for the headset and the steaming uplink which communicate via ADB.
                </p>
            </div>
        </div>
    );
}
