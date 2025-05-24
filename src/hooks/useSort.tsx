import { useMemo } from "react";

export default function useSort<T, K extends keyof T>(
  items: T[],
  key: K,
  ascending: boolean = true
): T[] {
  return useMemo(() => {
    return [...items].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // Si ambos son strings, ve si parsean como fecha:
      if (typeof aVal === "string" && typeof bVal === "string") {
        const aTime = Date.parse(aVal);
        const bTime = Date.parse(bVal);

        if (!isNaN(aTime) && !isNaN(bTime)) {
          // comparador numérico de fechas
          return ascending ? aTime - bTime : bTime - aTime;
        }
        // si no son fechas, caemos a comparar texto
        return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      // Números normales
      if (typeof aVal === "number" && typeof bVal === "number") {
        return ascending ? aVal - bVal : bVal - aVal;
      }

      // por defecto, sin cambio
      return 0;
    });
  }, [items, key, ascending]);
}
