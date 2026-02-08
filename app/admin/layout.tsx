import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-area min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin" className="text-lg font-semibold">
            Admin
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/admin/profile"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Profile
            </Link>
            <Link
              href="/admin/settings"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Site Settings
            </Link>
            <Link
              href="/admin/reviews"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Reviews
            </Link>
            <Link
              href="/admin/substack"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Substack
            </Link>
            <Link
              href="/admin/projects"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View Site
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
