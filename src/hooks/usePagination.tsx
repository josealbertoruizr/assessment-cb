import { useMemo } from "react";

/**
 * Hook para paginar un array.
 * @param items - array de elementos a paginar.
 * @param page - página actual (1 index based).
 * @param perPage - elementos por página.
 * @returns objeto con items de la página y páginas totales.
 */
export default function usePagination<T>(
  items: T[],
  page: number,
  perPage: number
): { paged: T[]; totalPages: number } {
  const totalPages = useMemo(
    () => Math.ceil(items.length / perPage),
    [items.length, perPage]
  );

  const paged = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  return { paged, totalPages };
}
