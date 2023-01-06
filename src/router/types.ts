import { ReactNode } from "react";

export interface RouteItem{
    element?:ReactNode,
    path:string,
    children?:RouteItem[],
    key?:string,
    icon?:ReactNode,
    label?:string
  } 