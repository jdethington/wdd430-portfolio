import { handleSignOut } from "@/app/lib/actions";

export function SignOutButton() {
  return (
    <form action={handleSignOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
