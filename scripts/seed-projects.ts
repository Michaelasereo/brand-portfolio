import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const projects = [
  {
    slug: "corepay-fintech",
    title: "Corepay",
    category: "brand_identity",
    thumbnail_url: "https://picsum.photos/seed/corepay/600/600",
    hero_image_url: "https://picsum.photos/seed/corepay-hero/1200/600",
    brief:
      "Brand identity and motion design for Corepay, a fintech company focused on seamless payments across Africa. The project encompassed logo design, brand guidelines, and animated assets for marketing campaigns.",
    sort_order: 1,
  },
  {
    slug: "pookie-ecommerce",
    title: "Pookie",
    category: "illustrations",
    thumbnail_url: "https://picsum.photos/seed/pookie/600/600",
    hero_image_url: "https://picsum.photos/seed/pookie-hero/1200/600",
    brief:
      "Illustrations and motion design for Pookie, an e-commerce brand in the pet care space. Created a cohesive set of illustrations for product packaging, social media, and in-app experiences.",
    sort_order: 2,
  },
  {
    slug: "truedeck-ai-edtech",
    title: "Truedeck",
    category: "motion",
    thumbnail_url: "https://picsum.photos/seed/truedeck/600/600",
    hero_image_url: "https://picsum.photos/seed/truedeck-hero/1200/600",
    brief:
      "Brand identity and motion design for Truedeck, an AI-powered EdTech platform. Developed the visual identity, UI elements, and motion graphics for product launches and investor materials.",
    sort_order: 3,
  },
];

async function seed() {
  const { data, error } = await supabase.from("projects").insert(projects).select();
  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
  console.log("Seeded 3 projects:", data?.map((p) => p.title).join(", "));
}

seed();
