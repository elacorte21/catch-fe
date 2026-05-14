import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

type PaginationComponentProps = {
  page: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent = ({
  page,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationComponentProps) => {
  return (
    <Pagination.Root
      count={totalItems}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => onPageChange(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Previous page">
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(pg) => (
            <IconButton
              key={pg.value}
              variant={pg.value === page ? "outline" : "ghost"}
              onClick={() => onPageChange(pg.value)}
              aria-label={`Page ${pg.value}`}
            >
              {pg.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Next page">
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default PaginationComponent;