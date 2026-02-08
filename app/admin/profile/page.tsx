import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .single();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}
