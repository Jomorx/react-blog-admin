import { IFriendChain } from "@/api/friendChain";

  export interface TableInfo {
    count: number;
    currentPage: number;
    pageSize: number;
    data: IFriendChain[];
    searchText:string
  }
