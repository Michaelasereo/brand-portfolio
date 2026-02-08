import { createClient } from "@/lib/supabase/server";
import { profile as fallbackProfile } from "@/lib/profile";

export type ProfileSocial = { label: string; href: string; icon: string };
export type ProfileCta = { label: string; href: string };

export interface Profile {
  name: string;
  title: string;
  about: string;
  avatar: string;
  socials: ProfileSocial[];
  ctas: ProfileCta[];
}

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profile")
    .select("name, title, about, avatar_url, socials, ctas")
    .limit(1)
    .single();

  if (!data) {
    return {
      name: fallbackProfile.name,
      title: fallbackProfile.title,
      about: fallbackProfile.about,
      avatar: fallbackProfile.avatar,
      socials: fallbackProfile.socials as ProfileSocial[],
      ctas: fallbackProfile.ctas as ProfileCta[],
    };
  }

  return {
    name: data.name ?? fallbackProfile.name,
    title: data.title ?? fallbackProfile.title,
    about: data.about ?? fallbackProfile.about,
    avatar: data.avatar_url ?? fallbackProfile.avatar,
    socials: (data.socials as ProfileSocial[]) ?? fallbackProfile.socials,
    ctas: (data.ctas as ProfileCta[]) ?? fallbackProfile.ctas,
  };
}
