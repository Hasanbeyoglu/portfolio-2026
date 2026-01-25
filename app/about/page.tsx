import { ArrowRight, MapPin, SquareCode } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About | Ertugrul Hasanbeyoglu',
    description: 'Frontend Developer with 5+ years of experience in React, TypeScript, and Next.js',
};

export default function AboutPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
            <section className="py-20 section-transition translate-y-4 animate-fade-in-up" id="about">
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 flex items-center gap-4 text-white">
                    <span className="w-12 h-1 bg-lime-400"></span> About Me
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">

                    <div className="bento-card glass-panel col-span-1 md:col-span-2 row-span-2 rounded-3xl p-8 flex flex-col relative overflow-hidden group gap-6">
                        <div className="z-10">
                            <h3 className="text-2xl font-bold mb-4 text-white">Who I am</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Frontend Developer with 5+ years building scalable web applications.
                                Currently at Planovo, previously worked in Turkey. I focus on performance,
                                accessibility, and clean architecture. Also volunteer as a web development
                                instructor at ReDI School Munich.
                            </p>
                        </div>
                        <div className="flex gap-2 z-10 flex-wrap">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">React</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">Next.js</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">TypeScript</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">Tailwind</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">Redux</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">MUI</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">Figma</span>
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl p-2 flex items-center">
                            <div className="flex w-full items-center justify-center gap-12">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-accent-lime">5+</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Years Exp</p>
                                </div>
                                <div className="h-10 w-px bg-white/10"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-accent-cyan">10+</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Projects</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bento-card col-span-1 row-span-2 rounded-3xl overflow-hidden relative group border border-white/10">
                        <Image alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/profile-image.jpg" width={500} height={500} />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                            <p className="font-display font-bold text-xl text-white">Design-Driven</p>
                            <p className="text-gray-400 text-sm">Developer</p>
                        </div>
                    </div>


                    <div className="bento-card col-span-1 row-span-1 rounded-3xl p-6 flex flex-col justify-center items-center text-center backdrop-blur-xl bg-black/40 border border-white/10 shadow-lg hover:shadow-xl hover:bg-black/50 transition-all duration-300">
                        <MapPin className="w-8 h-8 mb-3 text-lime-400" strokeWidth={1.5} />
                        <p className="font-bold text-lg text-white">Based in</p>
                        <p className="text-gray-400">Munich, Germany</p>
                    </div>


                    <div className="bento-card col-span-1 row-span-1 rounded-3xl p-6 flex flex-col justify-center group cursor-pointer backdrop-blur-xl bg-black/40 border border-white/10 shadow-lg hover:shadow-xl hover:bg-black/50 hover:border-lime-400/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <SquareCode className="w-8 h-8 mb-3 text-lime-400" strokeWidth={1.5} />
                            <ArrowRight className='-rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 text-lime-400' strokeWidth={2} />
                        </div>
                        <p className="font-bold text-lg text-white">GitHub</p>
                        <p className="text-xs text-gray-400">Check my code</p>
                    </div>

                </div>
            </section>
        </main>
    );
}