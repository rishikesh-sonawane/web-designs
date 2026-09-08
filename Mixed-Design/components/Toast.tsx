"use client";
import { useState, useEffect, useCallback, createContext, useContext } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const ToastContext = createContext<{
  toast: (message: string, type?: Toast["type"]) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const toast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div aria-live="polite" style={{
        position: "fixed", bottom: 80, right: 32, zIndex: 300,
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            style={{
              background: "#111111",
              border: "0.5px solid rgba(249,248,246,0.1)",
              padding: "14px 20px",
              fontFamily: "var(--font-body)", fontSize: 13,
              color: t.type === "error" ? "#c44" : t.type === "success" ? "var(--color-moss)" : "var(--color-charcoal)",
              backdropFilter: "blur(12px)",
              maxWidth: 320,
              animation: "toastIn 0.3s ease",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
