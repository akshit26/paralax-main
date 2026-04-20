"use client";

import { useState } from "react";

import { CONTACT } from "@/data/siteConfig";

type Status = "idle" | "ready";

export default function ContactPageForm() {
  const [status, setStatus] = useState<Status>("idle");

  return (
    <form
      className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus("ready");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CONTACT.formFields.map((field) => {
          if (field.type === "select") {
            return (
              <label key={field.name} className="flex flex-col gap-2">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#dcecff]">
                  {field.label}
                </span>
                <select
                  name={field.name}
                  defaultValue=""
                  required={Boolean(field.required)}
                  className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#88b8ff]/50"
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          if (field.type === "textarea") {
            return (
              <label key={field.name} className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#dcecff]">
                  {field.label}
                </span>
                <textarea
                  name={field.name}
                  rows={5}
                  placeholder={field.placeholder}
                  required={Boolean(field.required)}
                  className="min-h-40 rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#88b8ff]/50"
                />
              </label>
            );
          }

          return (
            <label key={field.name} className="flex flex-col gap-2">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#dcecff]">
                {field.label}
              </span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={Boolean(field.required)}
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#88b8ff]/50"
              />
            </label>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {CONTACT.services.map((service) => (
          <span
            key={service}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/72"
          >
            {service}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-6 text-white/58">
          {status === "ready"
            ? "This contact flow is now page-ready. Connect the form action or CRM endpoint next to accept live submissions."
            : CONTACT.note}
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full border border-[#ffc56f]/30 bg-[#ffc56f]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#ffc56f]/50 hover:bg-[#ffc56f]/18"
        >
          {CONTACT.submitButton}
        </button>
      </div>
    </form>
  );
}
