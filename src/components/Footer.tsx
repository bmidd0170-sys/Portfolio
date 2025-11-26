export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100">
      <div className="section-container">
        <div className="border-t border-slate-700 pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">
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
