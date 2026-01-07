export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex-col items-center relative z-10"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl sm:text-2xl text-slate-200/90 dark:text-slate-200 mb-10">
          I'm a full-stack developer passionate about creating beautiful and
          functional web experiences.
        </p>
        <div className="flex gap-5 justify-center flex-wrap">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 min-w-[170px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/40 hover:shadow-blue-400/70 hover:-translate-y-0.5 hover:scale-[1.02] whitespace-nowrap text-sm sm:text-base md:text-lg transition-transform transition-shadow duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 min-w-[170px] rounded-full border border-slate-500/70 bg-slate-900/40 text-slate-100 font-medium hover:border-blue-400 hover:bg-slate-800/70 hover:text-blue-100 backdrop-blur-sm whitespace-nowrap text-sm sm:text-base md:text-lg transition-colors transition-shadow duration-200"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
