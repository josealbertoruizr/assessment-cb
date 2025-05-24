// src/app/page.tsx
import SailingListContainer from "@/components/SailingListContainer";
import { getSailings } from "@/lib/api";

export default async function HomePage() {
  const sailings = await getSailings();
  return (
    <main className="min-h-screen p-8">
      <SailingListContainer initialData={sailings} />
    </main>
  );
}
