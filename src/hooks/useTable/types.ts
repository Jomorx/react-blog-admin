export interface TableInfo<T> {
  count: number;
  currentPage: number;
  pageSize: number;
  data: T[];
  searchText:string
}
