"use client";

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import UserItem from "@/components/UserItem";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import api from "@/utils/api";
import { ToastContainer } from "react-toastify";
import useCustomToast from "@/hooks/toast/ToastNotification ";
import { User } from "@/types/myTypes";

const token: string | undefined = Cookies.get("token");

// fetcher function
const getData = async (result: number, page: number) => {
  const { data } = await api.get(`/users/users?page=${page}&limit=${result}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};



export default function UserPage() {
  //initialize custom hook
  const triggerToast = useCustomToast();
  // ref hook for selection element for refetchnew data
  const elementRef = useRef(null);

  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let [page, setPage] = useState<number>(1);

  // function for fetch data
  const fetchData = async (result: number) => {
    try {
      setLoading(true);
      const { users: news, pagination } = await getData(result, page);

      if (news) {
        setPage(pagination.currentPage + 1);
        setUsers((prevUsers: any) => [...(prevUsers || []), ...news]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // fetch initial data
  useEffect(() => {
    fetchData(10);
  }, []);

  // refetch for new data
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchData(10);
          setPage(page += 1);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Function to delete user by ID
  const handleDeleteUser = async (userId: string) => {
    try {
      await api.delete(`/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove user from state
      setUsers((prevUsers: any) =>
        prevUsers?.filter((user: User) => user._id !== userId)
      );
      triggerToast({
        title: "User deleted successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers: any) =>
      prevUsers?.map((user: User) =>
        user._id === updatedUser._id ? { ...user, ...updatedUser } : user
      )
    );
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-500 mb-5">
        Users List
      </h1>
      <div className="space-y-6">
        {users?.map((user: User, index: number) => (
          <UserItem
            key={index}
            user={user}
            onDelete={handleDeleteUser}
            onSave={handleUpdateUser}
          />
        ))}
      </div>
      {loading && <Loading />}
      <div ref={elementRef}>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
