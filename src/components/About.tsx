export default function About() {
  return (
    <section
      id="about"
      className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-center relative z-10 bg-transparent"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
        <div>
          <img
            src="/DSC_0938.jpg"
            alt="About Me Photo"
            className="w-64 h-64 object-cover object-top rounded-lg mx-auto mb-6 shadow-lg border-2 border-white dark:border-slate-800"
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
