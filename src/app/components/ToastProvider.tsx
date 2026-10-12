"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--surface)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
        },
      }}
    />
  );
}