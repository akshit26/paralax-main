"use client";

import { useState } from "react";

export default function LoginPanel() {
  const [message, setMessage] = useState("");

  return (
    <form
      className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Portal UI is ready. Connect your authentication provider next to enable live client logins.");
      }}
    >
      <div className="space-y-2">
        <label className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#dcecff]" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="name@brand.com"
          className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#88b8ff]/50"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#dcecff]" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter password"
          className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#88b8ff]/50"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full border border-[#88b8ff]/30 bg-[#88b8ff]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#88b8ff]/50 hover:bg-[#88b8ff]/18"
      >
        Continue
      </button>

      <p className="text-sm leading-6 text-white/58">
        {message || "Use this page as the future client portal entry. Authentication, roles, and password recovery can be connected next."}
      </p>
    </form>
  );
}
