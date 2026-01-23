import { User, Home as HomeIcon, Grid2X2, Mail, Sun, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <section className="min-h-[85vh] flex flex-col justify-center relative section-transition translate-y-4 animate-fade-in-up" id="home">
          <div className="absolute top-0 right-0 p-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-600/30 bg-green-500/10 text-green-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for work
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-lime-400 font-mono mb-4 text-lg">  Hi, I'm Ertugrul</h2>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 text-white">
                Building
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Digital</span>
                <br />
                Experiences.
              </h1>
              <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
                Frontend Developer with 5+ years of experience building scalable web applications
                with React, TypeScript, and Next.js. Based in Munich.
              </p>
              <div className="flex gap-4">
                <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  <span className="relative z-10 transition-colors duration-300">View Projects</span>
                </button>
                <button className="px-8 py-4 border border-white/20 hover:border-white text-white rounded-full transition-all duration-300">
                  <span className="relative z-10 transition-colors duration-300">Contact Me</span>
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <Image src="/profile-image.jpg" alt="Profile" width={500} height={500} className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute -bottom-6 -left-6 bg-dark-card border border-black/5 border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md animate-bounce" style={{ animationDuration: "3s" }}>
                  <div className="flex items-center gap-3">
                    <Code />
                    <div>
                      <p className="text-xs text-gray-400">Tech Stack</p>
                      <p className="font-bold text-white">Modern &amp; Fast</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-2 scale-90 md:scale-100 shadow-2xl ring-1 ring-white/10 bg-black/20">
          <ul className="flex items-center gap-2 list-none m-0 p-0">
            <li>
              <Link href="#" className="nav-link group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300 active flex items-center justify-center">
                <span className="bg-indicator absolute inset-0 bg-white/5 group-hover:scale-100 rounded-full transition-transform scale-100"></span>
                <HomeIcon />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Home</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="nav-link group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                <span className="bg-indicator absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-full transition-transform"></span>
                <User />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">About</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="nav-link group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                <span className="bg-indicator absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-full transition-transform"></span>
                <Grid2X2 />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Projects</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="nav-link group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                <span className="bg-indicator absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-full transition-transform"></span>
                <Mail />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Contact</span>
              </Link>
            </li>
          </ul>
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <button className="group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300">
            <Sun />
          </button>
        </div>
      </nav>
    </>
  );
}
