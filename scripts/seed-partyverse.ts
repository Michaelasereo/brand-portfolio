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

Over the next few months and a lot of beta testing we refined what our offerings were, and the design evolved with this process. It was interesting because it felt like building a thousand apps in one, while trying to make them fit into one ecosystem.

Questions like "How do we build a seamless payment experience?" were quickly followed by "How do we integrate it so it syncs with features like budgeting and gifting and vendors so we eliminate manual tracking for each individual payment?", ensuring that we didn't have a poorly formed Frankenstein of good intentions.

Partyverse v.1.0. was very design-led (or design-fought, depending on who you ask). Working with such a stellar small team meant that often we held very strong opinions about how to do things. Some nights were very fun passionate arguments about our experiences and how that shapes what we think a feature should do, or how it would be used.

Working on Partyverse meant designing inside LiveCapital's ecosystem. Our team was small, but we constantly tapped into the wider design group—sharing ideas, arguing about fonts, and pulling inspiration from a brand system that was growing alongside the product. I'd worked with most of them before, both as a freelancer and in real life, so the whole thing felt like building something ambitious with close friends.`;

const SYSTEM = `From the on-set, Partyverse sought to be scalable. We wanted an experience that felt tailored to you, whether you were hosting a games night with five of your guys, planning a wedding, or putting together a detty december concert line up. We wanted an interface that could be as lean or as robust as your needs required them to be.

We iterated on a lot of options; but ultimately, I loved the idea of a modular event board: a dark, flexible home interface where users add "blocks" or "cards" for each feature and the event grows as they add more, creating a customizable, modular, and visual event page.

As a bonus, it felt fresh. Like an instantly recognizable fingerprint for the app.

Partyverse launched as an all-in-one event planning experience — everything from event setup, ticketing, planning, collaboration, payments, guest lists, RSVPs, gifting, budgeting, and communication. This case study is being written in our first month out of beta, and currently users have hosted over 20,000 events across the app, with 33,000+ unique users trying Partyverse for the first time. People loved how easy it was to set things up and how the product felt built for their reality and their headaches.

But you don't have to take my word for it — just search "Partyverse" on Twitter/X.`;

const TAKEAWAYS = `**LESSON 1: Design with Context**

A key ingredient in Partyverse's success was understanding the context of planning events in Nigeria. How events actually work, who we were designing for, what wasn't working, and how people have been solving these problems long before any app existed.

Two examples stand out. The first was the Event Location feature. We initially designed it as a simple pin that opened in Google or Apple Maps. But directions in Nigeria aren't that straightforward. Most places are known by colloquial names or nearby landmarks, and Maps can be unreliable. To make navigation easier, we added a full address field with an optional Map Direction input so guests always know exactly where they're going.

The second was Convert to Cash for gifting. We've all been there — receiving a gift you don't want or need, and not knowing what to do with it. On Partyverse, you can choose to receive cash instead. It's instantly added to your event wallet with a small thank-you note to your gifter, because while saying "thank you" is polite everywhere, in Nigerian culture it's non-negotiable.

**LESSON 2: Design for Everyone in the Room**

Partyverse moved fast. Even after launch, we iterated constantly. One thing became clear early on: in our mission to make everyone a planner, we had over-optimized for hosts and planners. The people who make events come alive — attendees, partygoers, ravers, the "I just came to enjoy" crew — didn't have as much to do in the product.

So we went back to the drawing board. That process gave birth to Partyverse's explore page, a space for discovering trending events, and Memories, a shared gallery where your favourite moments live on through everyone else's lens. Around the same time, while planning "Design Is Not Dead Lagos" entirely across iMessage, WhatsApp and Partyverse, we realised one more thing: groups needed a place to talk inside the app. That insight led to building Chat, so planning and deliberation never has to leave the product again.

**LESSON 3: Ship, Learn, Adjust**

At the time of this case study, Partyverse was on Build 310. Across 310 iterations, many ideas were explored, tested, and ultimately cut. We'd spend weeks on a feature, only to realise right before or after launch that it didn't align with the mission or the moment — and we rolled it back immediately. No ego, no hesitation. Just honest evaluation. We tried, it didn't work, and we moved forward.

**LESSON 4: Add Delight**

This has always been my mantra. We did a lot of research and testing to get Partyverse to where it is today, but the north star never changed — planning should feel as fun as the event it leads to.

You can see this everywhere: in the branding, the avatars, the splash screens, the shareable RSVP pages, even the tone of voice on social media. My favourite feedback has been people saying, "This app just feels fun." That's exactly what we wanted.

**CLOSER**

This case study mostly focused on the sprint-team for v1.0 where I solo-ed, but since then, I've had the pleasure of working with Philip and Tolu on the product, website, admin dashboards and other behind the scenes systems for Partyverse, and I couldn't have asked for a better team. The branding and custom Partyverse font 'Owambe Sans' were both done by the amazing Daniel Ezeh.

Of course, s/o to the marketers, engineers and everyone else I built this with. 10/10 experience.`;

const partyverseProject = {
  slug: "partyverse-event-app",
  title: "Partyverse",
  category: "brand_identity" as const,
  thumbnail_url: "https://picsum.photos/seed/partyverse/600/600",
  hero_image_url: "https://picsum.photos/seed/partyverse-hero/1920/1080",
  brief:
    "Partyverse was starting from zero and wanted a product that felt alive. A place where anyone could plan something for their circle without friction or fear. I led the design of the very first experience, shaping the flows, the visuals and the personality of the app from the ground up.",
  company_name: "Partyverse",
  callout_heading: "Designing a new way to host events for people who never thought they could.",
  industry: "Events",
  role_tools: "Lead Designer, Creative Direction (Figma, prototyping)",
  year: "2025",
  tags: ["Product Design", "Mobile App", "UX"],
  sort_order: 0,
  process_gallery_urls: [
    "https://picsum.photos/seed/partyverse-p1/1200/800",
    "https://picsum.photos/seed/partyverse-p2/1200/800",
    "https://picsum.photos/seed/partyverse-p3/1200/800",
    "https://picsum.photos/seed/partyverse-p4/1200/800",
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
      "https://picsum.photos/seed/partyverse-proc3/800/600",
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

async function seedPartyverse() {
  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", partyverseProject.slug)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("projects")
      .update({
        ...partyverseProject,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", partyverseProject.slug);

    if (error) {
      console.error("Update failed:", error.message);
      process.exit(1);
    }
    console.log("Updated Partyverse project with full case study content.");
  } else {
    const { error } = await supabase.from("projects").insert({
      ...partyverseProject,
      process_gallery_urls: partyverseProject.process_gallery_urls,
      results: "",
    }).select();

    if (error) {
      console.error("Insert failed:", error.message);
      process.exit(1);
    }
    console.log("Created Partyverse project with full case study content.");
  }
  console.log("View at: /project/partyverse-event-app");
}

seedPartyverse();
