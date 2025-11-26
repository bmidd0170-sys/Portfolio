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
    <section id="contact" className="section-container">
      <h2 className="section-title">Get In Touch</h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-slate-600 dark:text-slate-300 mb-8 text-lg">
          I'd love to hear from you! Feel free to reach out with any questions
          or opportunities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
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
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
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
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              You can also reach me at:
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:your@email.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Email
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
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
