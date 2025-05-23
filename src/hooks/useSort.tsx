import { useMemo } from "react";

/**
 * Hook para ordenar un array de objetos por una key combinada.
 * @param items - array de los sailings.
 * @param key - key del objeto por la que se ordena.
 * @param ascending - true para ascendente, false para descendente.
 * @returns array ordenado.
 */
export default function useSort<T, K extends keyof T>(
  items: T[],
  key: K,
  ascending: boolean = true
): T[] {
  return useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // Si son strings, usar localeCompare
      if (typeof aVal === "string" && typeof bVal === "string") {
        return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      // Si son números, restar
      if (typeof aVal === "number" && typeof bVal === "number") {
        return ascending ? aVal - bVal : bVal - aVal;
      }

      // Otros tipos: no cambia el orden
      return 0;
    });
    return sorted;
  }, [items, key, ascending]);
}
