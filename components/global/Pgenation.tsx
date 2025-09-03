"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
export type Metadata = {
  total: number;
  totalPage: number;
  Page: number;
};
export function PaginationListing({
  pathe,
  Page,
  metadata,
}: {
  pathe: string;
  Page: number;
  metadata: Metadata;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { totalPage } = metadata;
  const [Pagee, setPage] = useState(searchParams.get("Page")?.toString() || "");
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("Page", value);
    } else {
      params.delete("Page");
    }
    replace(`/${pathe}?${params.toString()}`);
  }, 0);
  useEffect(() => {
    if (!searchParams.get("Page")) {
      setPage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("Page")]);
  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap gap-1">
        {/* Prev */}
        <PaginationItem>
          <Button
            onClick={() => {
              let prevPage = Page + 1;
              if (prevPage < 1) prevPage = totalPage;
              handleSearch(prevPage.toString());
            }}
            type="submit"
            variant="ghost"
            disabled={Page <= 1}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        {/* Page numbers (compact): show current, prev, next */}
        {Page > 2 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                handleSearch(Page.toString());
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {Page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Page > 1 && (
          <PaginationItem>
            <button
              type="submit"
              name="Page"
              value={String(Page - 1)}
              onClick={() => handleSearch(Page.toString())}
              className="px-3 py-2 rounded-md border"
            >
              {Page - 1}
            </button>
          </PaginationItem>
        )}
        <PaginationItem>
          <span className="px-3 py-2 rounded-md border bg-primary text-primary-foreground">
            {Page}
          </span>
        </PaginationItem>
        {Page < totalPage && (
          <PaginationItem>
            <button
              type="submit"
              name="Page"
              value={String(Page + 1)}
              className="px-3 py-2 rounded-md border"
            >
              {Page + 1}
            </button>
          </PaginationItem>
        )}
        {Page + 2 < totalPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Page + 1 < totalPage && (
          <PaginationItem>
            <PaginationLink href={`/listings?`}>{totalPage}</PaginationLink>
          </PaginationItem>
        )}
        {/* Next */}
        <PaginationItem>
          <Button
            onClick={() => {
              let prevPage = Page - 1;
              if (prevPage < 1) prevPage = totalPage;
              handleSearch(prevPage.toString());
            }}
            type="submit"
            variant="ghost"
            disabled={Page >= totalPage}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
