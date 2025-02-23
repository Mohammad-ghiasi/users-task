"use client";

import Footer from "@/components/Footer";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { User, UserResponse } from "@/types/myTypes";
import useSWR, { mutate } from "swr";
import Button from "@/components/UI/Button";
import { fetcher } from "@/utils/fetcher";
import dynamic from "next/dynamic";
import SkeletonUserItem from "../SkeletonUserItem";

const UserItem = dynamic(() => import("@/components/UserItem"), {
  ssr: false,
  loading: () => <SkeletonUserItem />,
});


// Get token from cookies
const token: string | undefined = Cookies.get("token");
const hashedId: string | undefined = Cookies.get("hashedId");

export default function UserPageComponent({ users }: { users: UserResponse }) {
  let [page, setPage] = useState<number>(1);
  let [lastPage, setLastPage] = useState<boolean>(false);

  const { data, isValidating } = useSWR<UserResponse>("users", null, {
    keepPreviousData: true,
    dedupingInterval: 60000,
    revalidateOnMount: false,
  });


  useEffect(() => {
    mutate("users", (cached: UserResponse | undefined) => {
      return cached ? cached : users;
    }, false);
  }, [users]);
  

  const loadMore = useCallback(
    async (pageInfo: any) => {
      if (pageInfo.currentPage < pageInfo.totalPages) {
        const newdata = await fetcher(token, page + 1);
        if (newdata) {
          mutate(
            "users",
            (cached: UserResponse | undefined) => ({
              users: [...(cached?.users || []), ...newdata.users],
              pagination: newdata.pagination,
            }),
            false
          );
        }
        setPage((prev) => prev + 1);
      } else {
        setLastPage(true);
      }
    },
    [page, token] // وابستگی‌ها: هر وقت `page` یا `token` عوض شد، دوباره ساخته میشه
  );
  
  const loadMoreHandler = useCallback(() => {
    if (data?.pagination) {
      loadMore(data.pagination);
    }
  }, [data, loadMore]); // وابستگی‌ها: `data` و `loadMore`

  if (!data) return <div>Error fetching users! Please try again later.</div>;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-500 mb-5">
        Users List
      </h1>

      <div className="space-y-6">
        {data?.users?.map((user: User) => (
          <UserItem key={user._id} user={user} hashedId={hashedId} />
        ))}
      </div>
      {!lastPage && (
        <Button
          type="button"
          onClick={loadMoreHandler}
          className="w-full hover:opacity-80 shadow-md my-10"
          isLoading={isValidating}
        >
          Load More
        </Button>
      )}

      <div className="my-4">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
}
