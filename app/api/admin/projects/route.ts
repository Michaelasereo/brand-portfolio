import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    const { error } = await supabase.from("projects").insert({
      slug: body.slug,
      title: body.title,
      tagline: body.tagline ?? null,
      company_name: body.company_name ?? null,
      company_logo_url: body.company_logo_url ?? null,
      callout_heading: body.callout_heading ?? null,
      intro_heading: body.intro_heading ?? null,
      intro_description: body.intro_description ?? null,
      category: body.category,
      thumbnail_url: body.thumbnail_url,
      hero_image_url: body.hero_image_url ?? null,
      brief: body.brief ?? null,
      industry: body.industry ?? null,
      year: body.year ?? null,
      case_study_locked: body.case_study_locked ?? false,
      role_tools: body.role_tools ?? null,
      tags: body.tags ?? [],
      sections: body.sections ?? [],
      results: body.results ?? null,
      markdown_content: body.markdown_content ?? null,
      process_gallery_urls: body.process_gallery_urls ?? [],
      gallery_urls: body.gallery_urls ?? [],
      section_galleries: body.section_galleries ?? {},
      section_subheading_after: body.section_subheading_after ?? {},
      section_subtitle_after: body.section_subtitle_after ?? {},
      reviews: body.reviews ?? [],
      sort_order: body.sort_order ?? 0,
    });

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("projects")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

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
