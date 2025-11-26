export default function About() {
  return (
    <section id="about" className="section-container bg-white dark:bg-slate-900">
      <h2 className="section-title">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
        <div>
          <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mx-auto mb-6"></div>
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
