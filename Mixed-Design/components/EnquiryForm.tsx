"use client";
import { useState, FormEvent } from "react";

export default function EnquiryForm({ propertyName }: { propertyName?: string }) {
  const [interest, setInterest] = useState("request-details");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    if (!value.trim()) return "This field is required";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
    return "";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const error = validateField(e.target.name, e.target.value);
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: error }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    // Validate all fields
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!email.trim()) errors.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email";
    if (!message.trim()) errors.message = "Please enter a message";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please fix the errors below.");
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    const subject = encodeURIComponent(`Enquiry${propertyName ? ` about ${propertyName}` : ""} from ${name}`);
    const body = encodeURIComponent(`Interest: ${interest}\n\n${message}\n\n— ${name}\nEmail: ${email}`);

    setTimeout(() => {
      try {
        window.location.href = `mailto:rishikeshsonawane1465@gmail.com?subject=${subject}&body=${body}`;
        setStatus("success");
        setErrorMessage("");
      } catch {
        setStatus("error");
        setErrorMessage("Could not open email app. Please email us directly at rishikeshsonawane1465@gmail.com");
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <fieldset style={{ border: "none", padding: 0 }}>
        <legend className="overline" style={{ marginBottom: 20, display: "block" }}>I&apos;m interested in…</legend>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { value: "request-details", label: "Request details" },
            { value: "schedule-viewing", label: "Schedule a viewing" },
            { value: "speak-advisor", label: "Speak with an advisor" },
          ].map((opt) => (
            <label key={opt.value} style={{
              display: "flex", alignItems: "center", gap: 12,
              cursor: "pointer", fontSize: 14, color: "var(--color-charcoal)"
            }}>
              <input
                type="radio"
                name="interest"
                value={opt.value}
                checked={interest === opt.value}
                onChange={() => setInterest(opt.value)}
                style={{ accentColor: "var(--color-moss)", width: 14, height: 14 }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="overline" htmlFor="name" style={{ display: "block", marginBottom: 8 }}>
          Name {fieldErrors.name && <span style={{ color: "#c44" }}>*</span>}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          onBlur={handleBlur}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
        />
        {fieldErrors.name && (
          <p id="name-error" role="alert" style={{ fontSize: 11, color: "#c44", marginTop: 4 }}>
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label className="overline" htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
          Email {fieldErrors.email && <span style={{ color: "#c44" }}>*</span>}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          onBlur={handleBlur}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p id="email-error" role="alert" style={{ fontSize: 11, color: "#c44", marginTop: 4 }}>
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label className="overline" htmlFor="phone" style={{ display: "block", marginBottom: 8 }}>
          Phone <span style={{ color: "var(--color-bronze)", letterSpacing: "0.05em" }}>(optional)</span>
        </label>
        <input type="tel" id="phone" name="phone" autoComplete="tel" />
      </div>

      <div>
        <label className="overline" htmlFor="message" style={{ display: "block", marginBottom: 8 }}>
          Message {fieldErrors.message && <span style={{ color: "#c44" }}>*</span>}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell me about what you're looking for…"
          onBlur={handleBlur}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="message-error" role="alert" style={{ fontSize: 11, color: "#c44", marginTop: 4 }}>
            {fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="editorial-link"
        style={{
          width: "fit-content",
          opacity: status === "sending" ? 0.5 : 1,
          cursor: status === "sending" ? "not-allowed" : "pointer",
        }}
      >
        {status === "sending" ? "Sending…" : "Send enquiry"} <span className="arrow" />
      </button>

      {status === "error" && errorMessage && (
        <p role="alert" style={{ fontSize: 12, color: "#c44", minHeight: "1.5em" }}>
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <p role="status" style={{ fontSize: 12, color: "var(--color-moss)", minHeight: "1.5em" }}>
          Your email app should open with everything pre-filled. If not, email us directly at rishikeshsonawane1465@gmail.com
        </p>
      )}
    </form>
  );
}
