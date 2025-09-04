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
  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          handleSearch(pageNumber.toString());
        }}
        className={`'flex items-center justify-center pointer-coarse px-4 h-10 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100   dark:text-gray-100 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-white  dark:hover:text-white' ${
          activeClass ? "bg-black  dark:bg-neutral-800" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: Page === 1 }));

    // dots
    if (Page > 2) {
      pageButtons.push(
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              handleSearch(Page.toString());
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    // active/current page
    if (Page !== 1 && Page !== totalPage) {
      pageButtons.push(addPageButton({ pageNumber: Page, activeClass: true }));
    }
    // dots
    if (Page < totalPage - 1) {
      pageButtons.push(
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
      );
    }

    // last button
    pageButtons.push(
      addPageButton({
        pageNumber: totalPage,
        activeClass: Page === totalPage,
      })
    );
    return pageButtons;
  };
  if (totalPage < 3) {
    return null;
  }

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

        {Page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {renderPageButtons()}
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
