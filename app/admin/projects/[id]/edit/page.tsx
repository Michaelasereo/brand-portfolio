import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../../ProjectForm";
import { DeleteProjectButton } from "./DeleteProjectButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Project</h1>
        <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
