import request from "@/config";
import { IFriendChain } from "./types";
import { DataType, ReturnType } from "../types";

export const getFriendChainListApi = (
  currentPage: number,
  pageSize: number,
  searchText: string
): Promise<ReturnType<DataType<IFriendChain>>> =>
  request.get(
    `/friendChain/getFriendChainList`,{
      params:{
        currentPage,pageSize,searchText
      }
    }
  );

export const deleteFriendChainListApi = (friendChainList: number[]) =>
  request.post(`/friendChain/deleteFriendChainList`, { friendChainList });

export const insertFriendChainApi = (friendChain:IFriendChain) =>request.post("/friendChain/insertFriendChain", friendChain);

export const editFriendChainApi = (friendChain:IFriendChain) =>request.post("/friendChain/editFriendChain", friendChain);
