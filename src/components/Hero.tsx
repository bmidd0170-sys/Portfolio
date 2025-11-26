export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-container"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8">
          I'm a full-stack developer passionate about creating beautiful and
          functional web experiences.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
