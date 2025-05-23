"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortSelect({
  defaultValue = "price-asc",
  onChange,
}: {
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [sortValue, setSortValue] = useState(defaultValue);

  const handleSortChange = (value: string) => {
    setSortValue(value);
    console.log("Orden interno:", value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Price – Lowest first</SelectItem>
          <SelectItem value="price-desc">Price – Highest first</SelectItem>
          <SelectItem value="date-asc">Departure – Earliest first</SelectItem>
          <SelectItem value="date-desc">Departure – Latest first</SelectItem>
          <SelectItem value="duration-asc">Duration – Shortest</SelectItem>
          <SelectItem value="duration-desc">Duration – Longest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
