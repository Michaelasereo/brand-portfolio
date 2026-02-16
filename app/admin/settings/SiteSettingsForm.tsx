"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_PROJECTS_PER_TAB = {
  all: 4,
  brand_identity: 4,
  motion: 4,
  illustrations_decks_flyers: 4,
} as const;

const TAB_LABELS: { key: keyof typeof DEFAULT_PROJECTS_PER_TAB; label: string }[] = [
  { key: "all", label: "Featured" },
  { key: "brand_identity", label: "Brand Identity" },
  { key: "motion", label: "Product Design" },
  { key: "illustrations_decks_flyers", label: "Design Engineering" },
];

interface SiteSettings {
  id: string;
  primary_color: string;
  secondary_color: string;
  border_radius: string;
  font_family: string;
  projects_per_tab?: Record<string, number> | null;
}

interface SiteSettingsFormProps {
  settings: SiteSettings;
}

function getProjectsPerTab(settings: SiteSettings): Record<string, number> {
  const raw = settings.projects_per_tab;
  if (!raw || typeof raw !== "object") return { ...DEFAULT_PROJECTS_PER_TAB };
  return {
    all: Number(raw.all) || DEFAULT_PROJECTS_PER_TAB.all,
    brand_identity: Number(raw.brand_identity) || DEFAULT_PROJECTS_PER_TAB.brand_identity,
    motion: Number(raw.motion) || DEFAULT_PROJECTS_PER_TAB.motion,
    illustrations_decks_flyers: Number(raw.illustrations_decks_flyers) || DEFAULT_PROJECTS_PER_TAB.illustrations_decks_flyers,
  };
}

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    primary_color: settings.primary_color,
    secondary_color: settings.secondary_color,
    border_radius: settings.border_radius,
    font_family: settings.font_family,
    projects_per_tab: getProjectsPerTab(settings),
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
      <div className="space-y-4">
        <Label>Projects per tab (homepage)</Label>
        <p className="text-sm text-muted-foreground">
          Number of case studies to show in each tab. Tab badges show this count (capped by how many exist).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {TAB_LABELS.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`projects_per_tab_${key}`}>{label}</Label>
              <Input
                id={`projects_per_tab_${key}`}
                type="number"
                min={1}
                max={50}
                value={formData.projects_per_tab[key]}
                onChange={(e) =>
                  setFormData((d) => ({
                    ...d,
                    projects_per_tab: {
                      ...d.projects_per_tab,
                      [key]: Math.min(50, Math.max(1, parseInt(e.target.value, 10) || 1)),
                    },
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
