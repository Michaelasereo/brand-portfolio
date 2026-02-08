import { createClient } from "@/lib/supabase/server";
import { SiteSettingsForm } from "./SiteSettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  if (!settings) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-semibold">Site Settings</h1>
        <p className="text-muted-foreground">
          No settings found. Run the Supabase schema SQL to create the
          site_settings table and seed a default row.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Site Settings</h1>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
