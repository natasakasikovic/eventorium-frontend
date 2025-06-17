export interface PageProperties {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}