"use client";

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import UserItem from "@/components/UserItem";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import useCustomToast from "@/hooks/ToastNotification ";
import { User } from "@/types/myTypes";
import useSWRInfinite from "swr/infinite";
import api from "@/utils/api";

// Get token from cookies
const token: string | undefined = Cookies.get("token");

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default function UserPage() {
  const triggerToast = useCustomToast();
  const elementRef = useRef<HTMLDivElement | null>(null); // Typed the ref

  const [users, setUsers] = useState<User[] | null>([]); // Initialize as an empty array

  // SWR Infinite Query setup
  const { data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
    (index) => `/users/users?page=${index + 1}&limit=10`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Merge users from different pages into a single array
  useEffect(() => {
    if (data) {
      // Merge new users with the existing users state
      setUsers((prevUsers) => [
        ...(prevUsers || []), // Keep the previous users (or an empty array if null)
        ...data[data.length - 1]?.users || [], // Add new users from the latest page
      ]);
    }
  }, [data]);

  // Infinite scrolling using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isValidating) {
          setSize(size + 1); // Load next page
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
  }, [isValidating, size, setSize]);

  // Function to delete user by ID
  const handleDeleteUser = async (userId: string) => {
    try {
      await api.delete(`/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove user from state
      setUsers((prevUsers: any) => prevUsers?.filter((user: User) => user._id !== userId));
      triggerToast({
        title: "User deleted successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      triggerToast({
        title: "Error deleting user.",
        status: "error",
      });
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers: any) =>
      prevUsers?.map((user: User) =>
        user._id === updatedUser._id ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Error handling
  if (error) {
    return <div>Error fetching users. Please try again later.</div>;
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-500 mb-5">
        Users List
      </h1>
      <div className="space-y-6">
        {users?.map((user, index) => (
          <UserItem
            key={index}
            user={user}
            onDelete={handleDeleteUser}
            onSave={handleUpdateUser}
          />
        ))}
      </div>
      {isValidating && <Loading />}
      <div ref={elementRef} className="my-4">
        {/* Button to manually load more data */}
        {data && data.length && !isValidating && (
          <button
            onClick={() => setSize(size + 1)}
            className="text-center"
          >
            End of users
          </button>
        )}
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
