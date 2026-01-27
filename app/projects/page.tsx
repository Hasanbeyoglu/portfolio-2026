import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Ertugrul Hasanbeyoglu',
    description: 'Portfolio of web development projects using React, TypeScript, and Next.js',
};

export default function ProjectsPage() {
    return (
        <main className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-8 pb-32">
            <section id="projects" className="py-20 section-transition translate-y-4 animate-fade-in-up">
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 flex items-center gap-4 text-white">
                    <span className="w-12 h-1 bg-lime-400"></span> Selected Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <div className="group relative rounded-3xl overflow-hidden bg-[#1a1a1a] border border-white/10 hover:border-purple-400 transition-colors shadow-lg shadow-purple-500/10">
                        <div className="aspect-video w-full overflow-hidden bg-gray-900">
                            <img src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzMwMzAzMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTA1MDUwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMwMzAzMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJncmFkaWVudFRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiBmcm9tPSIwIiB0bz0iMiIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4gPC9saW5lYXJHcmFkaWVudD4gPC9kZWZzPiA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPiA8L3N2Zz4=" alt="CryptoDash" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 bg-[#1a1a1a]">
                            <h3 className="text-xl font-bold mb-2 text-white">Task Management Dashboard</h3>
                            <p className="text-gray-400 text-sm mb-4">Real-time task tracking application with drag-and-drop,
                                team collaboration, and data visualization.</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">React</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">TypeScript</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">Redux</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">MUI</span>
                            </div>
                            <a href="#" className="inline-flex items-center text-sm font-bold text-white hover:text-purple-400 transition-colors">
                                View Case Study <ArrowRight className='-rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 text-purple-400' strokeWidth={2} />
                            </a>
                        </div>
                    </div>

                    <div className="group relative rounded-3xl overflow-hidden bg-[#1a1a1a] border border-white/10 hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-500/10">
                        <div className="aspect-video w-full overflow-hidden bg-gray-900">
                            <img src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzMwMzAzMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTA1MDUwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMwMzAzMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJncmFkaWVudFRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiBmcm9tPSIwIiB0bz0iMiIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4gPC9saW5lYXJHcmFkaWVudD4gPC9kZWZzPiA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPiA8L3N2Zz4=" alt="Nebula Weather" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 bg-[#1a1a1a]">
                            <h3 className="text-xl font-bold mb-2 text-white">Weather Forecast App</h3>
                            <p className="text-gray-400 text-sm mb-4">Location-based weather application with 7-day forecasts,
                                real-time updates, and responsive design.</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">React</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">TypeScript</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">Next.js</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">Tailwind</span>
                            </div>
                            <a href="#" className="inline-flex items-center text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                                View Case Study <ArrowRight className='-rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyan-400' strokeWidth={2} />
                            </a>
                        </div>
                    </div>

                    <div className="group relative rounded-3xl overflow-hidden bg-[#1a1a1a] border border-white/10 hover:border-lime-400 transition-colors shadow-lg shadow-lime-500/10">
                        <div className="aspect-video w-full overflow-hidden bg-gray-900">
                            <img src="data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSItMTAwJSIgeTE9IjAiIHgyPSIwIiB5Mj0iMCI+IDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzMwMzAzMCIvPiA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTA1MDUwIi8+IDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMwMzAzMCIvPiA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJncmFkaWVudFRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiBmcm9tPSIwIiB0bz0iMiIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4gPC9saW5lYXJHcmFkaWVudD4gPC9kZWZzPiA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPiA8L3N2Zz4=" alt="Lumina E-com" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6 bg-[#1a1a1a]">
                            <h3 className="text-xl font-bold mb-2 text-white">Product Catalog</h3>
                            <p className="text-gray-400 text-sm mb-4">E-commerce product browsing with filtering, search,
                                and shopping cart functionality.</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">Next.js</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">TypeScript</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">Redux</span>
                                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">Tailwind</span>
                            </div>
                            <a href="#" className="inline-flex items-center text-sm font-bold text-white hover:text-lime-400 transition-colors">
                                View Case Study <ArrowRight className='-rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 text-lime-400' strokeWidth={2} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}