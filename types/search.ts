export interface ProjectSearchParams {
  query?: string;
  page?: string;
  type?: "opensource" | "school";
}

export interface SearchResult<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}
