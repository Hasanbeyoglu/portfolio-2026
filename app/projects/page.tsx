import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Ertugrul Hasanbeyoglu',
    description: 'Portfolio of web development projects using React, TypeScript, and Next.js',
};

export default function ProjectsPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
            <div className="min-h-[85vh] flex flex-col justify-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                    Projects
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl">
                    Portfolio projects showcasing modern web development.
                </p>
                {/* TODO: Projects page content  will add */}
            </div>
        </main>
    );
}