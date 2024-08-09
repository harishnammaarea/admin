import clsx from "clsx";
import { Pagination } from "rsuite";

interface CommonPaginationProps {
  className?: string
  total: number,
  limit: number,
  activePage: number,
  onChangePage(page: number): void
  size?: "lg" | "md" | "sm" | "xs"
}

export default function CommonPagination({ className, total, limit, activePage, onChangePage,size="xs" }: CommonPaginationProps) {
  return (
    <Pagination
      prev
      next
      last
      first
      size={size}
      className={clsx("common-pagination", className)}
      total={total}
      limit={limit}
      activePage={activePage}
      onChangePage={onChangePage}
    />)
}