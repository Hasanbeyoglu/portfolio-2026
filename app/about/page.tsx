import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Ertugrul Hasanbeyoglu',
    description: 'Frontend Developer with 5+ years of experience in React, TypeScript, and Next.js',
};

export default function AboutPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
            <div className="min-h-[85vh] flex flex-col justify-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                    About Me
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl">
                    Frontend Developer with 5+ years of experience building scalable web applications.
                    Currently based in Munich, Germany.
                </p>
                {/* TODO: About content  will add */}
            </div>
        </main>
    );
}