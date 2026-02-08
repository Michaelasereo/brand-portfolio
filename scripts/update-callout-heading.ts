import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const calloutHeadings: Record<string, string> = {
  "corepay-fintech":
    "Designing a new way to host events for people who never thought they could.",
  "pookie-ecommerce":
    "Bringing personality and playfulness to pet care through illustration.",
  "truedeck-ai-edtech":
    "Shaping the future of learning with AI-powered education.",
};

async function updateCalloutHeadings() {
  for (const [slug, callout_heading] of Object.entries(calloutHeadings)) {
    const { error } = await supabase
      .from("projects")
      .update({ callout_heading })
      .eq("slug", slug);

    if (error) {
      console.error(`Failed to update ${slug}:`, error.message);
    } else {
      console.log(`Updated callout_heading for ${slug}`);
    }
  }
}

updateCalloutHeadings();
