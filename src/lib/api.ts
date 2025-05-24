import type { Sailing } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL as string;

/**
 * Envuelve fetch con opciones comunes (revalidate, errores, typing).
 */
async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    // Next.js ISR: revalida cada 60s
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Error fetching ${path}: ${res.status}`);
  }
  return res.json();
}

/**
 * Devuelve sólo la lista de sailings tipada y extrae
 */
export async function getSailings(): Promise<Sailing[]> {
  try {
    const { results } = await fetcher<{ results: Sailing[] }>("/sailings");
    return results;
  } catch (e) {
    console.error("[getSailings]", e);
    return [];
  }
}
