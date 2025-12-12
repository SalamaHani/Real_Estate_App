"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { metaData } from "@/utils/Tayp";

export default function PaginationListing({
  pathe,
  Page,
  metadata,
}: {
  pathe: string;
  Page: number;
  metadata: metaData;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { total, totalPage } = metadata;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(searchParams.get("Page")?.toString() || "");
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
        className={`flex items-center justify-center pointer-coarse px-4 h-10 leading-tight transition-all duration-200 ${activeClass
          ? "bg-primary text-primary-foreground shadow-md border border-primary/20"
          : "text-foreground/70 border border-border hover:bg-muted hover:text-foreground"
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
        <button
          className="flex items-center justify-center px-4 h-10 leading-tight pointer-coarse text-foreground/70 border border-border hover:bg-muted hover:text-foreground transition-all duration-200"
          key="dots-1"
        >
          ...
        </button>
      );
    }

    // active/current page
    if (Page !== 1 && Page !== totalPage) {
      pageButtons.push(addPageButton({ pageNumber: Page, activeClass: true }));
    }
    // dots
    if (Page < totalPage - 1) {
      pageButtons.push(
        <button
          className="flex items-center justify-center px-4 h-10 leading-tight text-foreground/70 pointer-coarse border border-border hover:bg-muted hover:text-foreground transition-all duration-200"
          key="dots-2"
        >
          ...
        </button>
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
  if (totalPage < 2) return null;
  if (total < 3) {
    return null;
  }

  return (
    <div className=" mt-2  flex  justify-center pb-15">
      <nav aria-label="Page flex flex-row-reverse   navigation example dark:bg-[#252525]">
        <div className="inline-flex  -space-x-px text-base h-10">
          <button
            onClick={() => {
              let prevpage = Page - 1;
              if (prevpage < 1) prevpage = totalPage;
              handleSearch(prevpage.toString());
            }}
            className="flex items-center justify-center px-4 h-10 ms-0 pointer-coarse leading-tight text-foreground/70 border border-e-0 border-border rounded-s-lg hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            Prev
          </button>
          {renderPageButtons()}
          <button
            onClick={() => {
              let nextpage = Page + 1;
              if (nextpage > totalPage) nextpage = 1;

              handleSearch(nextpage.toString());
            }}
            className="flex items-center justify-center px-4 h-10 pointer-coarse leading-tight text-foreground/70 border border-border rounded-e-lg hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
