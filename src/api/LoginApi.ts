import request from "@/config";
import { ReturnType } from "./types";
export const LoginApi = (
  account: string,
  password: string
): Promise<ReturnType<{ token: string }>> =>
  request.post("/login", { account, password });
