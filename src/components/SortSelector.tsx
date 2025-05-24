"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortValue } from "@/lib/sorting";

interface Props {
  defaultValue?: SortValue;
  onChange?: (newSort: SortValue) => void;
}

export function SortSelect({ defaultValue = "price-asc", onChange }: Props) {
  const [sortValue, setSortValue] = useState<SortValue>(defaultValue);

  // Cuando defaultValue cambie desde el padre, sincronizamos
  useEffect(() => {
    setSortValue(defaultValue);
  }, [defaultValue]);

  const handleSortChange = (value: SortValue) => {
    setSortValue(value);
    onChange?.(value);
  };

  return (
    <Select value={sortValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price – Lowest first</SelectItem>
        <SelectItem value="price-desc">Price – Highest first</SelectItem>
        <SelectItem value="departureDate-asc">
          Departure – Earliest first
        </SelectItem>
        <SelectItem value="departureDate-desc">
          Departure – Latest first
        </SelectItem>
        <SelectItem value="duration-asc">Duration – Shortest</SelectItem>
        <SelectItem value="duration-desc">Duration – Longest</SelectItem>
      </SelectContent>
    </Select>
  );
}
