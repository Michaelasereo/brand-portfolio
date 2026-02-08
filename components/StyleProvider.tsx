import { createClient } from "@/lib/supabase/server";

const FALLBACK_SETTINGS = {
  primary_color: "#000000",
  secondary_color: "#ffffff",
  border_radius: "0.5rem",
  font_family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

function getContrastingForeground(hex: string): string {
  const h = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3,6}$/.test(h)) return "#ffffff";
  const expanded = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h;
  const r = parseInt(expanded.slice(0, 2), 16);
  const g = parseInt(expanded.slice(2, 4), 16);
  const b = parseInt(expanded.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5 ? "#ffffff" : "#000000";
}

export async function StyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = FALLBACK_SETTINGS;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("primary_color, secondary_color, border_radius, font_family")
      .limit(1)
      .single();

    if (data) {
      settings = {
        primary_color: data.primary_color ?? FALLBACK_SETTINGS.primary_color,
        secondary_color:
          data.secondary_color ?? FALLBACK_SETTINGS.secondary_color,
        border_radius: data.border_radius ?? FALLBACK_SETTINGS.border_radius,
        font_family: data.font_family ?? FALLBACK_SETTINGS.font_family,
      };
    }
  } catch {
    // Use fallback if Supabase not configured or table missing
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary: ${settings.primary_color};
              --primary-foreground: ${getContrastingForeground(settings.primary_color)};
              --secondary: ${settings.secondary_color};
              --secondary-foreground: ${getContrastingForeground(settings.secondary_color)};
              --radius: ${settings.border_radius};
              --font-main: ${settings.font_family};
            }
          `,
        }}
      />
      {children}
    </>
  );
}
