export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // ページネーションのベースとなるパス (例: "/monsters")
}
