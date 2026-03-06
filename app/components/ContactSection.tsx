"use client";

import { useActionState } from "react";
import { sendEmail, type FormState } from "../actions/sendEmail";

export default function ContactSection() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    sendEmail,
    null
  );

  return (
    <section className="bg-[#f6ece1] px-8 py-24 md:px-16" id="contact">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left — info */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#fe6500] mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-black">
            Let&apos;s Work<br />Together
          </h2>
          <p className="mt-6 text-sm leading-7 text-black/60">
            Have a project in mind or just want to say hello?<br />
            Drop me a message and I&apos;ll get back to you.
          </p>
          <div className="mt-10 flex flex-col gap-4 text-sm text-black/70">
            <a
              href="mailto:jkenna817@gmail.com"
              className="hover:text-[#fe6500] transition-colors"
            >
              jkenna817@gmail.com
            </a>
            <a
              href="tel:+14258760424"
              className="hover:text-[#fe6500] transition-colors"
            >
              425.876.0424
            </a>
          </div>
        </div>

        {/* Right — form */}
        <form action={action} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              className="w-full rounded-xl bg-[#f6ece1] border border-black/10 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#fe6500]"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-xl bg-[#f6ece1] border border-black/10 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#fe6500]"
            />
          </div>
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            required
            className="w-full rounded-xl bg-[#f6ece1] border border-black/10 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#fe6500]"
          />
          <textarea
            name="body"
            placeholder="Your message…"
            rows={6}
            required
            className="w-full rounded-xl bg-[#f6ece1] border border-black/10 px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#fe6500] resize-none"
          />

          {state && (
            <p
              className={`text-sm font-medium ${
                state.success ? "text-green-700" : "text-red-600"
              }`}
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="self-start bg-[#fe6500] hover:bg-[#e05a00] disabled:opacity-60 transition-colors text-white font-medium px-8 py-3 rounded-full"
          >
            {pending ? "Sending…" : "Send Message"}
          </button>
        </form>

      </div>
    </section>
  );
}
