import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const PROJECTS_PER_TAB_KEYS = [
  "all",
  "brand_identity",
  "motion",
  "illustrations_decks_flyers",
] as const;
const MIN_PER_TAB = 1;
const MAX_PER_TAB = 50;

function validateProjectsPerTab(
  value: unknown
): Record<string, number> | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "object" || Array.isArray(value)) return null;
  const obj = value as Record<string, unknown>;
  const result: Record<string, number> = {};
  for (const key of PROJECTS_PER_TAB_KEYS) {
    const v = obj[key];
    if (typeof v !== "number" || v < MIN_PER_TAB || v > MAX_PER_TAB) return null;
    result[key] = v;
  }
  return result;
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, primary_color, secondary_color, border_radius, font_family, projects_per_tab } =
      body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing settings id" },
        { status: 400 }
      );
    }

    const validatedProjectsPerTab = validateProjectsPerTab(projects_per_tab);

    const supabase = createAdminClient();
    const updatePayload: Record<string, unknown> = {
      primary_color: primary_color ?? undefined,
      secondary_color: secondary_color ?? undefined,
      border_radius: border_radius ?? undefined,
      font_family: font_family ?? undefined,
      updated_at: new Date().toISOString(),
    };
    if (validatedProjectsPerTab !== null) {
      updatePayload.projects_per_tab = validatedProjectsPerTab;
    }

    const { error } = await supabase
      .from("site_settings")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
