import { prisma } from "@repo/prisma";
import styles from "./page.module.css";
import { UserForm } from "./user-form";

export default async function Home() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>User Management</h1>

        <UserForm />

        <h2>Users List</h2>
        {users.length === 0 ? (
          <p>No users found. Add one above!</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.id}: {user.username}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
