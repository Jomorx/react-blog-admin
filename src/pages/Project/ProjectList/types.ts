export interface RowType {
    projectId: React.Key;
    projectName: string;
    projectCover: string;
    projectDescription:string;
    createdAt:Date
  }


  export interface TableInfo {
    count: number;
    currentPage: number;
    pageSize: number;
    data: RowType[];
    searchText:string
  }
