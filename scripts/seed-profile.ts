import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { profile } from "../lib/profile";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const profileRow = {
  name: profile.name,
  title: profile.title,
  about: profile.about,
  avatar_url: profile.avatar,
  socials: profile.socials,
  ctas: profile.ctas,
};

async function seedProfile() {
  const { data: existing } = await supabase
    .from("profile")
    .select("id")
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("profile")
      .update({ ...profileRow, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (error) {
      console.error("Update failed:", error.message);
      process.exit(1);
    }
    console.log("Updated profile.");
  } else {
    const { error } = await supabase.from("profile").insert(profileRow);
    if (error) {
      console.error("Insert failed:", error.message);
      process.exit(1);
    }
    console.log("Created profile.");
  }
}

seedProfile();
