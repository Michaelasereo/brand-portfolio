import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-2 font-medium">Site Settings</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Customize colors, border radius, and font family.
          </p>
          {settings && (
            <div className="mb-4 space-y-1 text-sm">
              <p>
                Primary:{" "}
                <span
                  className="inline-block h-4 w-8 rounded border"
                  style={{ backgroundColor: settings.primary_color }}
                />
                {settings.primary_color}
              </p>
              <p>
                Secondary:{" "}
                <span
                  className="inline-block h-4 w-8 rounded border"
                  style={{ backgroundColor: settings.secondary_color }}
                />
                {settings.secondary_color}
              </p>
            </div>
          )}
          <Button asChild>
            <Link href="/admin/settings">Edit Settings</Link>
          </Button>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-2 font-medium">Projects</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Manage portfolio projects and case studies.
          </p>
          <p className="mb-4 text-2xl font-bold">{projectCount ?? 0} projects</p>
          <Button asChild>
            <Link href="/admin/projects">Manage Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
