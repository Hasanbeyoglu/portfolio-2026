import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Ertugrul Hasanbeyoglu',
    description: 'Get in touch with me for job opportunities or collaborations',
};

export default function ContactPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
            <div className="min-h-[85vh] flex flex-col justify-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                    Contact
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl">
                    Let's connect! Available for new opportunities.
                </p>

                {/* TODO: Contact form will add */}
            </div>
        </main>
    );
}