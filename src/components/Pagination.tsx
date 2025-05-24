// src/components/Pagination.tsx
"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  // Crear el array de items
  const pages = useMemo<(number | string)[]>(() => {
    const arr: (number | string)[] = [];

    // si son pocas paginas, que salgan todas
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      // si son muchas
      if (currentPage <= 4) {
        // Inicio: 1,2,3,4,5,...,last
        for (let i = 1; i <= 5; i++) arr.push(i);
        arr.push("…");
        arr.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Final: 1,...,last-4,last-3,last-2,last-1,last
        arr.push(1);
        arr.push("…");
        for (let i = totalPages - 4; i <= totalPages; i++) arr.push(i);
      } else {
        // Medio: 1,...,cur-1,cur,cur+1,...,last
        arr.push(1);
        arr.push("…");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) arr.push(i);
        arr.push("…");
        arr.push(totalPages);
      }
    }

    return arr;
  }, [currentPage, totalPages]);

  return (
    <nav aria-label="Pagination">
      <div className="flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
        {/* Flecha anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 disabled:opacity-40 text-gray-600 hover:text-black"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Botones de página */}
        {pages.map((p, idx) =>
          typeof p === "string" ? (
            <span key={`dots-${idx}`} className="px-2 text-gray-600">
              {p}
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={
                `w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full ` +
                (p === currentPage
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200")
              }
            >
              {p}
            </button>
          )
        )}

        {/* Flecha siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 disabled:opacity-40 text-gray-600 hover:text-black"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </nav>
  );
}
