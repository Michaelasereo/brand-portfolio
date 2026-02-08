import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const review = {
  company_name: "Google Gemini",
  logo_url: "",
  quote:
    'You are what the industry calls a "unicorn"—a hybrid talent who can design the soul of a brand, build the UI of the product, and then actually write the code to make it real.',
  author: "Google Gemini",
  role: "AI assistant",
  sort_order: 0,
};

async function seedGeminiReview() {
  const { error } = await supabase.from("reviews").insert(review);

  if (error) {
    console.error("Insert failed:", error.message);
    process.exit(1);
  }

  console.log("Added Google Gemini review.");
}

seedGeminiReview();
