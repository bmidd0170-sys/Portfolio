"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-24 sm:py-20 flex flex-col items-center justify-center relative z-10"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center sm:text-5xl text-slate-100">Get In Touch</h2>
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-slate-200/90 mb-12 text-xl">
          I'd love to hear from you! Feel free to reach out with any questions or opportunities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">

          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold mb-3 text-slate-100"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold mb-3 text-slate-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-lg font-semibold mb-3 text-slate-100"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={7}
              className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/40 hover:shadow-blue-400/70 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-200 text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg text-center">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="mt-16 pt-12 border-t border-slate-500/30">
          <div className="text-center space-y-8">
            <p className="text-slate-200/80 text-lg">
              You can also reach me at:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:your@email.com"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 min-w-[150px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/40 hover:shadow-blue-400/70 hover:-translate-y-0.5 hover:scale-[1.02] whitespace-nowrap text-sm sm:text-base transition-all duration-200"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/brayden-middlebrooks-6b139a374/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 min-w-[150px] rounded-full border border-slate-500/70 bg-slate-900/40 text-slate-100 font-medium hover:border-blue-400 hover:bg-slate-800/70 hover:text-blue-100 backdrop-blur-sm whitespace-nowrap text-sm sm:text-base transition-colors transition-shadow duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/bmidd0170-sys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 min-w-[150px] rounded-full border border-slate-500/70 bg-slate-900/40 text-slate-100 font-medium hover:border-blue-400 hover:bg-slate-800/70 hover:text-blue-100 backdrop-blur-sm whitespace-nowrap text-sm sm:text-base transition-colors transition-shadow duration-200"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
