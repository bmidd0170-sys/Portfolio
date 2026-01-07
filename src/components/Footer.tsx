export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent text-slate-100">
      <div className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-center relative z-10">
        <div className="border-t border-slate-700 pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </h3>
              <p className="text-slate-400">
                Building beautiful web experiences with modern technologies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#home" className="hover:text-slate-100 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-slate-100 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-slate-100 transition">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-slate-100 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-100 transition"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-100 transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-100 transition"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>
              &copy; {currentYear} Your Name. All rights reserved. | Built with
              Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
