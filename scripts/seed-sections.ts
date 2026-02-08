import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const projectUpdates = [
  {
    slug: "corepay-fintech",
    industry: "Fintech",
    role_tools: "Sr. Brand & Motion Designer (Figma, After Effects, Illustrator)",
    tags: ["Brand Identity", "Motion Design"],
    sections: [
      {
        type: "strategy",
        heading: "Strategy",
        subtitle: "",
        description:
          "01. The Problem: The Trust & Structure Gap\n\nExisting fintech branding in the African market lacked the trust signals and structural clarity needed to convert users. We needed a systematic, modular brand identity engineered for the African 18+ economy.",
        image: "https://picsum.photos/seed/corepay-strategy/1920/1080",
        tag_color: "#ff6b00",
      },
      {
        type: "system",
        heading: "System",
        subtitle: "Visual identity architecture",
        description: "Developed a modular design system with clear hierarchy and reusable components for digital and print touchpoints.",
        image: "https://picsum.photos/seed/corepay-system/1920/1080",
        tag_color: "#ff6b00",
      },
      {
        type: "touchpoints",
        heading: "Touchpoints",
        subtitle: "Omnichannel rollout",
        description: "Applied the brand system across app UI, marketing materials, and social assets.",
        image: "https://picsum.photos/seed/corepay-touch/1920/1080",
        tag_color: "#ff6b00",
      },
      {
        type: "impact",
        heading: "Impact & Takeaway",
        subtitle: "Measurable outcomes",
        description: "Increased brand recognition and conversion through cohesive visual identity.",
        image: "https://picsum.photos/seed/corepay-impact/1920/1080",
        tag_color: "#ff6b00",
      },
    ],
  },
  {
    slug: "pookie-ecommerce",
    industry: "Ecommerce",
    role_tools: "Illustrator, Motion Designer (After Effects)",
    tags: ["Illustrations", "Motion Design"],
    sections: [
      {
        type: "strategy",
        heading: "Strategy",
        description: "Defined a playful, pet-friendly visual language for the e-commerce brand.",
        image: "https://picsum.photos/seed/pookie-strategy/1920/1080",
        tag_color: "#f59e0b",
      },
      {
        type: "system",
        heading: "System",
        description: "Illustration set and asset guidelines for packaging and digital.",
        image: "https://picsum.photos/seed/pookie-system/1920/1080",
        tag_color: "#f59e0b",
      },
      {
        type: "touchpoints",
        heading: "Touchpoints",
        description: "Applied illustrations across product packaging and social media.",
        image: "https://picsum.photos/seed/pookie-touch/1920/1080",
        tag_color: "#f59e0b",
      },
      {
        type: "impact",
        heading: "Impact & Takeaway",
        description: "Cohesive brand presence across all consumer touchpoints.",
        image: "https://picsum.photos/seed/pookie-impact/1920/1080",
        tag_color: "#f59e0b",
      },
    ],
  },
  {
    slug: "truedeck-ai-edtech",
    industry: "AI EdTech",
    role_tools: "Brand & Motion Designer (Figma, Illustrator)",
    tags: ["Brand Identity", "Motion Design"],
    sections: [
      {
        type: "strategy",
        heading: "Strategy",
        description: "Positioned Truedeck as an innovative AI-powered learning platform with a modern, trustworthy aesthetic.",
        image: "https://picsum.photos/seed/truedeck-strategy/1920/1080",
        tag_color: "#10b981",
      },
      {
        type: "system",
        heading: "System",
        description: "UI components and motion guidelines for the product experience.",
        image: "https://picsum.photos/seed/truedeck-system/1920/1080",
        tag_color: "#10b981",
      },
      {
        type: "touchpoints",
        heading: "Touchpoints",
        description: "Investor pitch deck, product screens, and launch materials.",
        image: "https://picsum.photos/seed/truedeck-touch/1920/1080",
        tag_color: "#10b981",
      },
      {
        type: "impact",
        heading: "Impact & Takeaway",
        description: "Strong visual identity for product launches and investor presentations.",
        image: "https://picsum.photos/seed/truedeck-impact/1920/1080",
        tag_color: "#10b981",
      },
    ],
  },
];

async function seedSections() {
  for (const update of projectUpdates) {
    const { slug, ...data } = update;
    const { error } = await supabase
      .from("projects")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);

    if (error) {
      console.error(`Failed to update ${slug}:`, error.message);
      process.exit(1);
    }
    console.log(`Updated ${slug}`);
  }
  console.log("Done. All 3 projects updated with sections.");
}

seedSections();
