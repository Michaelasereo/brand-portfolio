"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DeleteProjectButtonProps {
  projectId: string;
  projectTitle: string;
}

export function DeleteProjectButton({
  projectId,
  projectTitle,
}: DeleteProjectButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (
      !confirm(
        `Are you sure you want to delete "${projectTitle}"? This cannot be undone.`
      )
    ) {
      return;
    }

    const res = await fetch(`/api/admin/projects?id=${projectId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Failed to delete project");
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={handleDelete}
    >
      Delete Project
    </Button>
  );
}
