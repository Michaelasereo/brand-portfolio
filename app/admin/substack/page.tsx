"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Article {
  id: string;
  title: string;
  date: string | null;
  slug: string | null;
  sort_order: number;
}

export default function SubstackAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({});

  async function fetchArticles() {
    const res = await fetch("/api/admin/substack");
    if (res.ok) {
      const data = await res.json();
      setArticles(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  function startEdit(a: Article) {
    setEditingId(a.id);
    setFormData({
      title: a.title,
      date: a.date ?? "",
      slug: a.slug ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function saveEdit() {
    if (!editingId) return;
    const res = await fetch("/api/admin/substack", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, ...formData }),
    });
    if (res.ok) {
      await fetchArticles();
      cancelEdit();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Failed to update");
    }
  }

  async function deleteArticle(id: string) {
    if (!confirm("Delete this article?")) return;
    const res = await fetch(`/api/admin/substack?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchArticles();
      if (editingId === id) cancelEdit();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Failed to delete");
    }
  }

  async function handleAdd() {
    const res = await fetch("/api/admin/substack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Article",
        date: "Jan 2026",
        slug: "",
      }),
    });
    if (res.ok) {
      await fetchArticles();
      const data = await res.json();
      startEdit(data);
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Failed to add");
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-semibold">Substack Articles</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Substack Articles</h1>
        <Button onClick={handleAdd}>Add Article</Button>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Manage featured Substack articles on the homepage. Base URL from Profile
        CTAs (See me on Substack).
      </p>

      <div className="space-y-4">
        {articles.map((a) => (
          <div
            key={a.id}
            className="flex items-start justify-between gap-4 rounded-lg border p-4"
          >
            {editingId === a.id ? (
              <div className="flex-1 space-y-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title ?? ""}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, title: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <Label>Date (e.g. Jan 2026)</Label>
                    <Input
                      value={formData.date ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, date: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={formData.slug ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, slug: e.target.value }))
                      }
                      placeholder="article-slug"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveEdit}>
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {a.date ?? "-"} / {a.slug || "(no slug)"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="outline" size="sm" onClick={() => startEdit(a)}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteArticle(a.id)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-muted-foreground">
          No articles yet. Click Add Article to create one.
        </p>
      )}
    </div>
  );
}
