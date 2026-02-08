# Brand Designer Portfolio Engine

A high-end brand design portfolio for ti3cket.com built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

- **Admin-controlled CSS engine** – Site colors, border radius, and font family are fetched from Supabase and applied globally
- **Filterable project grid** – Tabs for Brand Identity, Illustrations, Motion, Marketing Assets
- **Case study template** – Hero → Brief → Process Gallery → Results
- **Admin dashboard** – Site Settings and Project Manager with image upload

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the SQL Editor
3. Create a Storage bucket named `project-assets` (public)
4. Copy `.env.example` to `.env.local` and add your Supabase URL, anon key, and service role key

### 3. Run development server

```bash
npm run dev
```

### 4. Admin protection (optional)

Set `ADMIN_SECRET` in `.env.local` to protect `/admin`. Then visit `/admin?secret=YOUR_SECRET` to log in.

## Project structure

```
app/
  layout.tsx          # Root layout + StyleProvider
  page.tsx            # Home (filter + grid)
  project/[slug]/     # Case study
  admin/              # Admin dashboard
components/
  ProjectCard.tsx
  ProjectGrid.tsx
  StyleProvider.tsx
  HomePageClient.tsx
lib/
  supabase/
```
