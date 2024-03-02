interface StreamPageProps {
    params: {
        code: string;
    };
}

export default function StreamPage({ params: { code } }: StreamPageProps) {
    return (
        <div>
            <h1>Code Parameter</h1>
            <p>The code is: {code}</p>
        </div>
    );
}
