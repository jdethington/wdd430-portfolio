// components/login-form.tsx
"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={6}
          required
        />
      </div>
      <button aria-disabled={isPending} type="submit" className="btn">
        {isPending ? "Signing in..." : "Sign In"}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
}
