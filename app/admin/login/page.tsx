"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/admin?secret=${encodeURIComponent(secret)}`);
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg border bg-card p-8"
      >
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your admin secret to access the dashboard.
        </p>
        <div className="space-y-2">
          <Label htmlFor="secret">Admin Secret</Label>
          <Input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter secret"
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
