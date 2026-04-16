"use client";

import { useEffect } from "react";

const IGNORED_MESSAGES = [
  "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.",
  "THREE.THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.",
  'THREE.GLTFLoader: Unknown extension "KHR_materials_pbrSpecularGlossiness".',
];

function shouldIgnore(args: unknown[]) {
  return args.some((arg) => typeof arg === "string" && IGNORED_MESSAGES.some((message) => arg.includes(message)));
}

export default function ClientConsoleFilters() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args: unknown[]) => {
      if (shouldIgnore(args)) return;
      originalWarn(...args);
    };

    console.error = (...args: unknown[]) => {
      if (shouldIgnore(args)) return;
      originalError(...args);
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}
