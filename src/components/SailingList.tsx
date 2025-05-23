import { Sailing } from "@/lib/types";
import { SailingCard } from "@/components/SailingCard";
import { SortSelect } from "@/components/SortSelector";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";

interface Props {
  data: Sailing[];
  sortKey: string;
  ascending: boolean;
  onSortChange: (value: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  totalTrips: number;
  onResetFilters: () => void;
}

export default function SailingListView({
  data,
  sortKey,
  ascending,
  onSortChange,
  page,
  totalPages,
  onPageChange,
  totalTrips,
  onResetFilters,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Sort UI */}
      <div className="flex justify-end items-center gap-2">
        <div className="">
          <h1 className="text-lg font-semibold">Sort By</h1>
        </div>
        <SortSelect
          defaultValue={`${sortKey}-${ascending ? "asc" : "desc"}`}
          onChange={onSortChange}
        />
      </div>

      {/* Reset Filters */}

      {/* Cards centradas */}
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="flex justify-start items-center gap-4">
          <h2 className="text-lg font-medium">{totalTrips} trips found</h2>
          <Button variant="outline" size="default" onClick={onResetFilters}>
            Reset Filters
          </Button>
        </div>
        {data.map((s, idx) => (
          <SailingCard key={`${s.name}-${s.departureDate}-${idx}`} data={s} />
        ))}
      </div>

      {/* Paginación centrada */}
      <div className="flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
