import { Github, GithubIcon, Hand, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Contact | Ertugrul Hasanbeyoglu',
    description: 'Get in touch with me for job opportunities or collaborations',
};

export default function ContactPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
            <section id="contact" className="py-20 min-h-[70vh] flex flex-col justify-center section-transition translate-y-4 animate-fade-in-up">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lime-600 dark:text-lime-400 font-mono mb-4">What's Next?</p>
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900 dark:text-white">
                        Let's work together on your next <br />
                        <span className="decoration-lime-500 dark:decoration-lime-400 underline decoration-4 underline-offset-8">masterpiece</span>.
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
                        I'm open to discussing new opportunities and collaborations.
                        Feel free to reach out if you'd like to connect!
                    </p>

                    <a href="mailto:hello@ertudev.app" className="inline-block relative px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-xl">
                        <span className="relative z-10 flex items-center gap-2">
                            Say Hello <Hand />
                        </span>
                        <div className="absolute inset-0 bg-lime-500 dark:bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </a>

                    <div className="mt-20 flex justify-center gap-8">
                        <a href="https://github.com/hasanbeyoglu" className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex flex-col items-center gap-2 group">
                            <span className="p-3 rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-colors">
                                <GithubIcon className="w-6 h-6 text-gray-700 dark:text-white dark:filter dark:invert dark:opacity-70 group-hover:text-gray-900 dark:group-hover:opacity-100 transition-all" />
                            </span>
                            <span className="text-sm">GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/ertugrulhasanbeyoglu/" className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex flex-col items-center gap-2 group">
                            <span className="p-3 rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-colors">
                                <LinkedinIcon className="w-6 h-6 text-[#0A66C2] dark:filter dark:grayscale group-hover:text-[#0A66C2] dark:group-hover:grayscale-0 transition-all" />
                            </span>
                            <span className="text-sm">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}