import { fetchSailings } from "@/lib/api";
import SailingListContainer from "@/components/SailingContainer";

export default async function Home() {
  const { results: sailings } = await fetchSailings();
  return (
    <main className="min-h-screen p-8">
      <SailingListContainer initialData={sailings} />
    </main>
  );
}
