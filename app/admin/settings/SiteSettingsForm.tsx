"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SiteSettings {
  id: string;
  primary_color: string;
  secondary_color: string;
  border_radius: string;
  font_family: string;
}

interface SiteSettingsFormProps {
  settings: SiteSettings;
}

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    primary_color: settings.primary_color,
    secondary_color: settings.secondary_color,
    border_radius: settings.border_radius,
    font_family: settings.font_family,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: settings.id, ...formData }),
      });
      if (!res.ok) throw new Error("Failed to update");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update settings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primary_color">Primary Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            id="primary_color"
            value={formData.primary_color}
            onChange={(e) =>
              setFormData((d) => ({ ...d, primary_color: e.target.value }))
            }
            className="h-10 w-14 cursor-pointer rounded border"
          />
          <Input
            value={formData.primary_color}
            onChange={(e) =>
              setFormData((d) => ({ ...d, primary_color: e.target.value }))
            }
            placeholder="#000000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="secondary_color">Secondary Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            id="secondary_color"
            value={formData.secondary_color}
            onChange={(e) =>
              setFormData((d) => ({ ...d, secondary_color: e.target.value }))
            }
            className="h-10 w-14 cursor-pointer rounded border"
          />
          <Input
            value={formData.secondary_color}
            onChange={(e) =>
              setFormData((d) => ({ ...d, secondary_color: e.target.value }))
            }
            placeholder="#ffffff"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="border_radius">Border Radius</Label>
        <Input
          id="border_radius"
          value={formData.border_radius}
          onChange={(e) =>
            setFormData((d) => ({ ...d, border_radius: e.target.value }))
          }
          placeholder="0.5rem"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="font_family">Font Family</Label>
        <Input
          id="font_family"
          value={formData.font_family}
          onChange={(e) =>
            setFormData((d) => ({ ...d, font_family: e.target.value }))
          }
          placeholder="Inter, sans-serif"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
