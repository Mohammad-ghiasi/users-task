import { pageType } from "@/types/myTypes";
import api from "./api";

export const fetcher = async (
  token: string | undefined,
  pageNum: pageType = 1
) => {
  let handlePageNum: pageType = pageNum;
  if (pageNum === "users") handlePageNum = 1;
  const response = await api.get(
    `/users/users?page=${handlePageNum}&limit=10`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
