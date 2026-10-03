// app/lib/data.ts
import { sql } from "@vercel/postgres";

export type User = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
};

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await sql<User>`
      SELECT id, email, name, password_hash AS "passwordHash"
      FROM users
      WHERE email = ${email}
    `;
  const row = rows[0];
  if (!row) return null;

  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    passwordHash: row.passwordHash, // must not be undefined
  };
}
