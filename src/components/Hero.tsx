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
        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8">
          I'm a full-stack developer passionate about creating beautiful and
          functional web experiences.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
