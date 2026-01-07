export default function About() {
  return (
    <section
      id="about"
      className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-20 flex flex-col items-center justify-start relative z-10 bg-transparent"
    >
      <h2
        className="text-3xl sm:text-4xl font-bold text-center"
        style={{ marginBottom: "3.5rem" }}
      >
        About Me
      </h2>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6 items-center max-w-5xl mx-auto">
        <div>
          <img
            src="/DSC_0938.jpg"
            alt="About Me Photo"
            className="w-64 h-64 object-cover object-top rounded-lg mx-auto mb-4 md:mb-0 shadow-lg border-2 border-white/80 dark:border-slate-800"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
        <div className="space-y-6">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Hello! I'm a passionate developer with expertise in modern web
            technologies. I love turning ideas into reality through clean,
            efficient code and intuitive user interfaces.
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            With a background in full-stack development, I specialize in
            building responsive web applications using React, Next.js, and
            TypeScript. I'm committed to continuous learning and staying
            updated with the latest industry trends.
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the
            developer community.
          </p>
        </div>
      </div>
    </section>
  );
}
