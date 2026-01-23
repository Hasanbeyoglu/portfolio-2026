import { Code } from "lucide-react";
import Image from "next/image";


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
    </>
  );
}
