"use client";

import Link from "next/link";
import { Button } from "../button"; // shadcn/uiのButtonを想定
import { PaginationProps } from "@/types/paginationProps";
// アイコンを使用する場合は、適宜インポートしてください。例:
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // 表示するページ番号の配列を生成するヘルパー関数
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5; // 表示する最大ページボタン数（奇数を推奨）
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= 1) {
      return []; // 1ページ以下の場合はページネーション不要
    }

    if (totalPages <= maxPagesToShow) {
      // 全ページ表示
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 省略表示あり
      let startPage = Math.max(1, currentPage - halfMaxPages);
      let endPage = Math.min(totalPages, currentPage + halfMaxPages);

      // 現在ページが先頭または末尾に近い場合の調整
      if (currentPage - halfMaxPages <= 0) {
        endPage = Math.min(totalPages, maxPagesToShow);
      }
      if (currentPage + halfMaxPages >= totalPages) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      }

      // 最初のページと省略記号(...)
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
      }

      // 中間のページ番号
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // 最後のページと省略記号(...)
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageLinks = getPageNumbers();

  if (pageLinks.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Page navigation" className="mt-8 mb-4">
      <ul className="flex items-center justify-center space-x-1 sm:space-x-2">
        {/* 前へボタン */}
        <li>
          <Link
            href={`${basePath}?page=${Math.max(1, currentPage - 1)}`}
            passHref
            className={currentPage === 1 ? "pointer-events-none" : ""}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          >
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              aria-label="前のページへ"
            >
              {/* <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" /> */}
              <span className="hidden sm:inline">前へ</span>
              <span className="sm:hidden">←</span>
            </Button>
          </Link>
        </li>

        {/* ページ番号リンク */}
        {pageLinks.map((page, index) => (
          <li key={`page-${page === "..." ? `ellipsis-${index}` : page}`}>
            {typeof page === "number" ? (
              <Link href={`${basePath}?page=${page}`} passHref>
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  aria-current={currentPage === page ? "page" : undefined}
                  className="min-w-[2.25rem] px-2 sm:min-w-[2.5rem]" // ボタン幅の調整
                >
                  {page}
                </Button>
              </Link>
            ) : (
              <span className="flex items-center justify-center px-1.5 py-1 sm:px-2 h-9 text-sm text-muted-foreground">
                {page}
              </span>
            )}
          </li>
        ))}

        {/* 次へボタン */}
        <li>
          <Link
            href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`}
            passHref
            className={currentPage === totalPages ? "pointer-events-none" : ""}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
          >
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              aria-label="次のページへ"
            >
              <span className="hidden sm:inline">次へ</span>
              <span className="sm:hidden">→</span>
              {/* <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" /> */}
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
