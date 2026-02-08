"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProfileSocial, ProfileCta } from "@/lib/profile-server";

const SOCIAL_ICONS = ["linkedin", "x", "instagram", "behance", "substack"];

interface ProfileFormProps {
  profile: {
    name?: string;
    title?: string;
    about?: string;
    avatar_url?: string;
    socials?: ProfileSocial[] | null;
    ctas?: ProfileCta[] | null;
  } | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: profile?.name ?? "",
    title: profile?.title ?? "",
    about: profile?.about ?? "",
    avatar_url: profile?.avatar_url ?? "",
    socials: (profile?.socials ?? []) as ProfileSocial[],
    ctas: (profile?.ctas ?? []) as ProfileCta[],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? "",
        title: profile.title ?? "",
        about: profile.about ?? "",
        avatar_url: profile.avatar_url ?? "",
        socials: (profile.socials ?? []) as ProfileSocial[],
        ctas: (profile.ctas ?? []) as ProfileCta[],
      });
    }
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let avatarUrl = formData.avatar_url;
      if (avatarFile) {
        avatarUrl = await uploadFile(avatarFile, `avatar-${Date.now()}`);
      }

      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          avatar_url: avatarUrl,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save");
      }
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  function updateSocial(i: number, field: keyof ProfileSocial, value: string) {
    setFormData((d) => ({
      ...d,
      socials: d.socials.map((s, j) =>
        j === i ? { ...s, [field]: value } : s
      ),
    }));
  }

  function addSocial() {
    setFormData((d) => ({
      ...d,
      socials: [
        ...d.socials,
        { label: "", href: "", icon: SOCIAL_ICONS[0] ?? "linkedin" },
      ],
    }));
  }

  function removeSocial(i: number) {
    setFormData((d) => ({
      ...d,
      socials: d.socials.filter((_, j) => j !== i),
    }));
  }

  function updateCta(i: number, field: keyof ProfileCta, value: string) {
    setFormData((d) => ({
      ...d,
      ctas: d.ctas.map((c, j) => (j === i ? { ...c, [field]: value } : c)),
    }));
  }

  function addCta() {
    setFormData((d) => ({
      ...d,
      ctas: [...d.ctas, { label: "", href: "" }],
    }));
  }

  function removeCta(i: number) {
    setFormData((d) => ({
      ...d,
      ctas: d.ctas.filter((_, j) => j !== i),
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((d) => ({ ...d, title: e.target.value }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="about">About</Label>
        <p className="text-xs text-muted-foreground">
          Use markdown for links: [link text](https://example.com)
        </p>
        <Textarea
          id="about"
          value={formData.about}
          onChange={(e) =>
            setFormData((d) => ({ ...d, about: e.target.value }))
          }
          rows={5}
          placeholder="Your bio. Add links with [text](url)..."
        />
      </div>
      <div className="space-y-2">
        <Label>Avatar</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
        />
        <Input
          value={formData.avatar_url}
          onChange={(e) =>
            setFormData((d) => ({ ...d, avatar_url: e.target.value }))
          }
          placeholder="Or paste image URL"
          className="mt-2"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Social Links</Label>
          <Button type="button" variant="outline" size="sm" onClick={addSocial}>
            Add
          </Button>
        </div>
        {formData.socials.map((s, i) => (
          <div key={i} className="flex gap-2 rounded-lg border p-4">
            <Input
              placeholder="Label"
              value={s.label}
              onChange={(e) => updateSocial(i, "label", e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="https://linkedin.com/in/yourprofile"
              value={s.href}
              onChange={(e) => updateSocial(i, "href", e.target.value)}
              className="flex-1"
            />
            <select
              value={s.icon}
              onChange={(e) => updateSocial(i, "icon", e.target.value)}
              className="rounded-md border px-2"
            >
              {SOCIAL_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeSocial(i)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>CTAs (Resume, Chat, etc.)</Label>
          <Button type="button" variant="outline" size="sm" onClick={addCta}>
            Add
          </Button>
        </div>
        {formData.ctas.map((c, i) => (
          <div key={i} className="flex gap-2 rounded-lg border p-4">
            <Input
              placeholder="Label"
              value={c.label}
              onChange={(e) => updateCta(i, "label", e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="https://..."
              value={c.href}
              onChange={(e) => updateCta(i, "href", e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeCta(i)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}

async function uploadFile(file: File, name: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Upload failed");
  }
  const { url } = await res.json();
  return url;
}
