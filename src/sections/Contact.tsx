'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    try {
      const res = await fetch("https://formspree.io/f/mykbezja", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)

      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error')
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <p className="section-label">// get in touch</p>
        <h2 className="section-title">Contact</h2>
        <div className="section-divider" />

        <div className={styles.grid}>
          <div className={styles.info}>
            <p className={styles.lead}>
              Have a question? Drop me a message and I&apos;ll get back to you.
            </p>
            <div className={styles.links}>
              <a
                href="https://github.com/VinnyPham"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                github.com/VinnyPham
              </a>
              <a href="https://www.linkedin.com/in/vinny-pham/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
              <a className={styles.contactLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                vinnypham327@gmail.com
              </a>
            </div>
          </div>

          <div className={styles.formWrap}>
            {status === 'sent' ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>✓</span>
                <p>Message sent! I&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <div className={styles.form}>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.input}
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className={styles.textarea}
                    placeholder="What's on your mind?"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  icon="→"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerText}>
            <span className={styles.footerMono}>Vinny</span> — Built with Next.js & TypeScript
          </p>
          <p className={styles.footerCopy}>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </section>
  );
}
