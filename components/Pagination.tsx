"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationComponent({
  currentPage,
  totalPages,
  category,
}: {
  currentPage: number
  totalPages: number
  category?: string
}) {
  const createPageLink = (page: number) =>
    `/blogs/?category=${category || "all"}&page=${page}`

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageLink(currentPage - 1)} />
          </PaginationItem>
        )}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageLink(page)}
                className={currentPage === page ? "font-bold" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageLink(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
