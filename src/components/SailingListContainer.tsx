"use client";

import { useState } from "react";
import useSort from "@/hooks/useSort";
import usePagination from "@/hooks/usePagination";
import SailingList from "@/components/SailingList";
import type { Sailing } from "@/lib/types";
import type { SortKey, SortValue, SortOrder } from "@/lib/sorting";

interface Props {
  initialData: Sailing[];
}

export default function SailingListContainer({ initialData }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [ascending, setAscending] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const sorted = useSort(initialData, sortKey, ascending);
  const { paged, totalPages } = usePagination(sorted, page, 10);

  const handleResetFilters = () => {
    setSortKey("price");
    setAscending(true);
    setPage(1);
  };

  const handleSortChange = (val: SortValue) => {
    const [key, order] = val.split("-") as [SortKey, SortOrder];
    setSortKey(key);
    setAscending(order === "asc");
    setPage(1);
  };

  return (
    <SailingList
      data={paged}
      totalTrips={sorted.length}
      sortKey={sortKey}
      ascending={ascending}
      onSortChange={handleSortChange}
      onResetFilters={handleResetFilters}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
