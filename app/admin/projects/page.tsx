import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

const CATEGORY_LABELS: Record<string, string> = {
  brand_identity: "Brand Identity",
  illustrations: "Design Engineering",
  motion: "Product Design",
  marketing_assets: "Marketing Assets",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const projects = data ?? [];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">Add Project</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: { id: string; slug: string; title: string; thumbnail_url: string; category: string }) => (
          <Link
            key={project.id}
            href={`/admin/projects/${project.id}/edit`}
            className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-video bg-muted">
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-medium group-hover:underline">
                {project.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {CATEGORY_LABELS[project.category] ?? project.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {projects.length === 0 && (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          <p className="mb-4">No projects yet.</p>
          <Button asChild>
            <Link href="/admin/projects/new">Add your first project</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
