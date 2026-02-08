"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Review {
  id: string;
  company_name: string;
  logo_url: string | null;
  quote: string;
  author: string;
  role: string | null;
  sort_order: number;
}

export default function ReviewsAdminPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({});

  async function fetchReviews() {
    const res = await fetch("/api/admin/reviews");
    if (res.ok) {
      const data = await res.json();
      setReviews(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  function startEdit(r: Review) {
    setEditingId(r.id);
    setFormData({
      company_name: r.company_name,
      logo_url: r.logo_url ?? "",
      quote: r.quote,
      author: r.author,
      role: r.role ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function saveEdit() {
    if (!editingId) return;
    const res = await fetch("/api/admin/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, ...formData }),
    });
    if (res.ok) {
      await fetchReviews();
      cancelEdit();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Failed to update");
    }
  }

  async function deleteReview(id: string) {
    if (!confirm("Delete this review?")) return;
    const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchReviews();
      if (editingId === id) cancelEdit();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Failed to delete");
    }
  }

  async function moveReview(id: string, direction: "up" | "down") {
    const i = reviews.findIndex((r) => r.id === id);
    if (i === -1) return;
    const j = direction === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= reviews.length) return;

    const arr = [...reviews];
    [arr[i], arr[j]] = [arr[j], arr[i]];

    for (let k = 0; k < arr.length; k++) {
      await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: arr[k].id, sort_order: k }),
      });
    }
    await fetchReviews();
  }

  async function handleAdd() {
    const res = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_name: "New Company",
        logo_url: "",
        quote: "Quote...",
        author: "Author",
        role: "Role",
      }),
    });
    if (res.ok) {
      await fetchReviews();
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
        <h1 className="mb-6 text-2xl font-semibold">Reviews</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <Button onClick={handleAdd}>Add Review</Button>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Manage homepage review slider (up to 6 recommended). Reorder with up/down
        buttons.
      </p>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div
            key={r.id}
            className="flex items-start gap-4 rounded-lg border p-4"
          >
            <div className="flex shrink-0 flex-col gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={i === 0}
                onClick={() => moveReview(r.id, "up")}
              >
                ↑
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={i === reviews.length - 1}
                onClick={() => moveReview(r.id, "down")}
              >
                ↓
              </Button>
            </div>

            {editingId === r.id ? (
              <div className="flex-1 space-y-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={formData.company_name ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({
                          ...d,
                          company_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Logo URL</Label>
                    <Input
                      value={formData.logo_url ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, logo_url: e.target.value }))
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <Label>Quote</Label>
                  <Input
                    value={formData.quote ?? ""}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, quote: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <Label>Author</Label>
                    <Input
                      value={formData.author ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, author: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input
                      value={formData.role ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, role: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveEdit}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{r.company_name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    &ldquo;{r.quote}&rdquo; — {r.author}
                    {r.role ? `, ${r.role}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(r)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteReview(r.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="text-muted-foreground">
          No reviews yet. Click &quot;Add Review&quot; to create one.
        </p>
      )}
    </div>
  );
}
