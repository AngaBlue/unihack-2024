'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function EnterCode() {
    const [code, setCode] = useState('');
    const router = useRouter();

    function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
        e?.preventDefault();
        if (!code) return;
        router.push(`/stream/${code}`);
    }

    return (
        <form className='grid gap-2' onSubmit={onSubmit}>
            <Input className='w-full' placeholder='XXXXXX' type='text' onChange={e => setCode(e.target.value)} value={code} />
            <Button className='w-full' type='submit' onClick={() => onSubmit()}>
                Join Stream
            </Button>
        </form>
    );
}
