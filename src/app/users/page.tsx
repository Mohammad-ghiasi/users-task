"use client";

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import UserItem from "@/components/UserItem";
import Cookies from "js-cookie";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { User, UserResponse } from "@/types/myTypes";
import api from "@/utils/api";
import useSWR from "swr";



type pageType = number | string;

// Get token from cookies
const token: string | undefined = Cookies.get("token");

const fetcher = async (pageNum: pageType = 1) => {
  let handlePageNum: pageType = pageNum;
  pageNum === "users" ? (handlePageNum = 1) : null;
  const response = await api.get(`/users/users?page=${handlePageNum}&limit=15`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default function UserPage() {

  let [page, setPage] = useState<number>(1);
  let [lastPage, setLastPage] = useState<boolean>(false);
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    "users",
    fetcher,
    {
      keepPreviousData: true,
      dedupingInterval: 60000,
    }
  );

  const loadMore = (pageIfno: any) => {
    if (pageIfno.currentPage < pageIfno.totalPages) {
      (async () => {
        const newdata = await fetcher(page + 1);
        if (newdata) {
          mutate((cashed: UserResponse) => {
            return {
              users: [...cashed.users, ...newdata.users],
              pagination: newdata.pagination,
            };
          }, false);
        }
      })();

      setPage((prev) => prev + 1);
    } else {
      setLastPage(true);
    }
  };

  const loadMoreHandler = () => {
    loadMore(data.pagination);
  };

  // Error handling for data fetching
  if (error) return <div>Error fetching users. Please try again later.</div>;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-500 mb-5">
        Users List
      </h1>

      <div className="space-y-6">
        {data?.users?.map((user: User) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
      {isValidating && <Loading />}
      {!lastPage && (
       <div
       onClick={loadMoreHandler}
       className="text-center bg-gradient-to-r from-green-400 to-green-600 text-white mx-5 mt-10 rounded-lg py-2 transition-all cursor-pointer hover:opacity-80 shadow-md active:scale-95 select-none"
     >
       Load More
     </div>
     
      )}

      <div className="my-4">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
}
