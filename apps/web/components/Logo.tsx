'use client';

import React from 'react';
import Image from 'next/image';

export default function Logo() {
    return <Image src={require('@web/images/logo.svg')} alt='InstructAR' width={32} height={32} />;
}
