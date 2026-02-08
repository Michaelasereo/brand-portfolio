import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const INTRO = `Partyverse went live on the 7th of November, 2025, with a bold unspoken promise to change how Nigerians — a culture known for their parties — celebrate. The launch followed months of quiet beta testing and even more months of research, design, and a lot of hair-pulling. Here's that story.`;

const CHALLENGE = `Planning an event in Nigeria is a headache. Most celebrations — birthdays, link-ups, housewarmings, engagements — are supposed to be joyful, but they often felt like logistical nightmares. Existing tools never really fit the way we do things. They felt stiff, generic, far removed from how Nigerians actually plan and celebrate, or just incomplete.

As a culture, we love to party. But the people organizing these moments, from brides and planners to friends hosting something small for their guys, were dealing with stress that quietly stole from the joy they were trying to create. We wanted to change that. Not just by removing friction for people who already plan, but by lowering the barrier to entry so anyone could decide to host something without fear.

Our goal was to simplify the entire process — planning, collaboration, payments, tracking, vendor sourcing — while keeping all the energy, color and magic that makes Nigerian celebrations what they are. We wanted a planning experience that felt vibrant, shareable and fun, without losing clarity or control.

**Our high-level goals were to:**

1. Make planning simple and welcoming for everyone, not just "event people."
2. Reduce the stress behind logistics, money, and coordination.
3. Create an experience that feels vibrant and joyful, not corporate or rigid.
4. Build a foundation flexible enough for any kind of celebration, big or small.

And we had the impossible timeline of one month. We didn't do it in a month, but hey, shoot for the stars, land on the moon, no?`;

const PROCESS = `First, we broke down the problem. What were we trying to do? How were we going to get there. We left behind the marketing speak of 'an all-in-one party app' and actually decided on features. What should users be able to do? How do we want them to feel? We had a lot of calls with seasoned event planners, and swapped campfire horror stories around our worst planning mis-adventures.

This was a relatively small team: myself, the founding designer roped into this chaos, and two founders - an engineer and a marketer. At the end of this all-nighter, we had our pain points, we had our feature list, we had our design moodboard and we had our goals for v.1.0. Then, design began.

Building Partyverse was so many firsts for me. It was the first mobile app I solo-designed from day zero (that actually went live); the first time building in such a rapid environment. There was literally a TestFlight version of the app ready a day after the initial screens were done. Research, design, engineering, QA and marketing all happening iteratively. It was quite exhilarating.

Over the next few months and a lot of beta testing we refined what our offerings were, and the design evolved with this process. It was interesting because it felt like building a thousand apps in one, while trying to make them fit into one ecosystem.`;

const SYSTEM = `From the on-set, Partyverse sought to be scalable. We wanted an experience that felt tailored to you, whether you were hosting a games night with five of your guys, planning a wedding, or putting together a detty december concert line up. We wanted an interface that could be as lean or as robust as your needs required them to be.

We iterated on a lot of options; but ultimately, I loved the idea of a modular event board: a dark, flexible home interface where users add "blocks" or "cards" for each feature and the event grows as they add more, creating a customizable, modular, and visual event page.

As a bonus, it felt fresh. Like an instantly recognizable fingerprint for the app.

Partyverse launched as an all-in-one event planning experience — everything from event setup, ticketing, planning, collaboration, payments, guest lists, RSVPs, gifting, budgeting, and communication. This case study is being written in our first month out of beta, and currently users have hosted over 20,000 events across the app, with 33,000+ unique users trying Partyverse for the first time. People loved how easy it was to set things up and how the product felt built for their reality and their headaches.`;

const TAKEAWAYS = `**LESSON 1: Design with Context**

A key ingredient in Partyverse's success was understanding the context of planning events in Nigeria. The Event Location feature and Convert to Cash for gifting were designed around how Nigerians actually navigate and give.

**LESSON 2: Design for Everyone in the Room**

We over-optimized for hosts. That insight led to the explore page, Memories (shared gallery), and Chat — so planning and deliberation never has to leave the product again.

**LESSON 3: Ship, Learn, Adjust**

Partyverse was on Build 310. Many ideas were explored, tested, and cut. No ego, no hesitation. Just honest evaluation.

**LESSON 4: Add Delight**

Planning should feel as fun as the event it leads to. My favourite feedback: "This app just feels fun." That's exactly what we wanted.

**CLOSER** — S/o to Philip, Tolu, Daniel Ezeh (Owambe Sans), and everyone who built this. 10/10 experience.`;

const update = {
  brief:
    "Partyverse was starting from zero and wanted a product that felt alive. A place where anyone could plan something for their circle without friction or fear. I led the design of the very first experience, shaping the flows, the visuals and the personality of the app from the ground up.",
  company_name: "Partyverse",
  callout_heading: "Designing a new way to host events for people who never thought they could.",
  industry: "Events",
  role_tools: "Lead Designer, Creative Direction (Figma, prototyping)",
  year: "2025",
  tags: ["Product Design", "Mobile App", "UX"],
  hero_image_url: "https://picsum.photos/seed/partyverse-hero/1920/1080",
  process_gallery_urls: [
    "https://picsum.photos/seed/partyverse-p1/1200/800",
    "https://picsum.photos/seed/partyverse-p2/1200/800",
    "https://picsum.photos/seed/partyverse-p3/1200/800",
  ],
  gallery_urls: [
    "https://picsum.photos/seed/partyverse-g1/1200/800",
    "https://picsum.photos/seed/partyverse-g2/1200/800",
    "https://picsum.photos/seed/partyverse-g3/1200/800",
  ],
  section_galleries: {
    intro: ["https://picsum.photos/seed/partyverse-intro/1920/600"],
    process: [
      "https://picsum.photos/seed/partyverse-proc1/800/600",
      "https://picsum.photos/seed/partyverse-proc2/800/600",
    ],
    system: ["https://picsum.photos/seed/partyverse-sys/1920/700"],
    gallery: [
      "https://picsum.photos/seed/partyverse-sc1/800/600",
      "https://picsum.photos/seed/partyverse-sc2/800/600",
      "https://picsum.photos/seed/partyverse-sc3/800/600",
      "https://picsum.photos/seed/partyverse-sc4/800/600",
    ],
  },
  sections: [
    {
      type: "strategy",
      heading: "The Challenge",
      subtitle: "Planning an event in Nigeria is a headache.",
      description: CHALLENGE,
      image: "https://picsum.photos/seed/partyverse-challenge/1920/1080",
      tag_color: "#F4F4E1",
    },
    {
      type: "system",
      heading: "The Direction & Product",
      subtitle: "Partyverse sought to be scalable.",
      description: SYSTEM,
      image: "https://picsum.photos/seed/partyverse-product/1920/1080",
      tag_color: "#F4F4E1",
    },
  ],
  markdown_content: TAKEAWAYS,
  results: null,
  reviews: [
    {
      companyName: "Partyverse User",
      quote:
        "Using Partyverse took me from the 'thinking about it' phase to the actual 'putting it in motion' phase very quickly. Maybe even too quickly. The ease of going from an idea, to adding collaborators, to having a link you can share with people, and sell tickets, all in one place, within 5 minutes was insane.",
      author: "Ifeoluwa Adekoya",
      role: "SEO Specialist",
    },
  ],
};

async function seedCorepayFull() {
  const { error } = await supabase
    .from("projects")
    .update({
      ...update,
      title: "Partyverse",
      updated_at: new Date().toISOString(),
    })
    .eq("slug", "corepay-fintech");

  if (error) {
    console.error("Update failed:", error.message);
    process.exit(1);
  }
  console.log("Updated Corepay project with full Partyverse case study content.");
  console.log("View at: /project/corepay-fintech");
}

seedCorepayFull();
