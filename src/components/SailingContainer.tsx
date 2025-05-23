"use client";

import { useState } from "react";
import useSort from "@/hooks/useSort";
import usePagination from "@/hooks/usePagination";
import SailingList from "@/components/SailingList";
import { Sailing } from "@/lib/types";

interface Props {
  initialData: Sailing[];
}

export default function SailingListContainer({ initialData }: Props) {
  // --- Estados de sort, page y posibles filtros ---
  const [sortKey, setSortKey] = useState<
    "price" | "departureDate" | "duration"
  >("price");
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  // EN CASO DE QUERER MÁS FILTROS LO DECLARO AQUÍ

  // ordenar con el hook de useSort /hooks/useSort.tsx
  const sorted = useSort(initialData, sortKey, ascending);

  // paginar con el hook de usePagination /hooks/usePagination.tsx
  const { paged, totalPages } = usePagination(sorted, page, 10);

  // --- Función para resetear filtros ---
  const handleResetFilters = () => {
    setSortKey("price");
    setAscending(true);
    setPage(1);
  };

  // --- Renderiza la View pasándole todos los props ---
  return (
    <SailingList
      data={paged}
      totalTrips={sorted.length}
      sortKey={sortKey}
      ascending={ascending}
      onSortChange={(val) => {
        const [key, order] = val.split("-");
        setSortKey(key as typeof sortKey);
        setAscending(order === "asc");
        setPage(1);
      }}
      onResetFilters={handleResetFilters}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
