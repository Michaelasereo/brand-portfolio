"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ACCENT = "#F4F4E1";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className="border-t border-border py-16"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Chat with <span style={{ color: ACCENT }}>me</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Send a message and I&apos;ll get back to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          <div>
            <Label htmlFor="contact-name" className="text-foreground">
              Name
            </Label>
            <Input
              id="contact-name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              disabled={status === "sending"}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="contact-email" className="text-foreground">
              Email
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
              disabled={status === "sending"}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="contact-message" className="text-foreground">
              Message
            </Label>
            <Textarea
              id="contact-message"
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              required
              rows={5}
              disabled={status === "sending"}
              className="mt-2 min-h-[120px] resize-y"
            />
          </div>

          {status === "success" && (
            <p className="text-sm text-green-500">
              Thanks! Your message has been sent. I&apos;ll reply soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">
              Something went wrong. Please try again.
            </p>
          )}

          <Button
            type="submit"
            disabled={status === "sending"}
            style={
              status !== "sending"
                ? { backgroundColor: ACCENT, color: "#0a0a0a" }
                : undefined
            }
          >
            {status === "sending" ? "Sending…" : "Send"}
          </Button>
        </form>
      </div>
    </section>
  );
}
