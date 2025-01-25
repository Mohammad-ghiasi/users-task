"use client";

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import UserItem from "@/components/UserItem";
import Cookies from "js-cookie";
import { useEffect, useRef, useState, useCallback } from "react";
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
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Function to handle setting users and updating localStorage
const updateUsers = (users: User[]) => {
  const uniqueUsers = Array.from(new Map(users.map((user) => [user.email, user])).values());
  localStorage.setItem("users", JSON.stringify(uniqueUsers));
  return uniqueUsers;
};

export default function UserPage() {
  const triggerToast = useCustomToast();
  const elementRef = useRef<HTMLDivElement | null>(null); // Typed the ref

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);

  // Check for data in localStorage on initial load
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers: User[] = JSON.parse(storedUsers);
      setUsers(updateUsers(parsedUsers)); // Update users state and localStorage
    }

    const storedPage = localStorage.getItem("page");
    if (storedPage) setPage(Number(storedPage));
  }, []);

  // SWR Infinite Query setup
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/users/users?page=${index + 1}&limit=10`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  // Merge users from different pages into a single array
  useEffect(() => {
    if (data) {
      const mergedUsers = [...users, ...data[data.length - 1]?.users || []];
      setUsers(updateUsers(mergedUsers)); // Update state and localStorage
    }
  }, [data]);

  // Infinite scrolling using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isValidating) {
          setSize(size + 1); // Load next page
          setPage((prevPage) => prevPage + 1); // Update page state
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [isValidating, size, setSize]);

  // Centralized error handler for API calls
  const handleApiError = useCallback((message: string) => {
    console.error(message);
    triggerToast({
      title: message,
      status: "error",
    });
  }, [triggerToast]);

  // Delete user by ID
  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      await api.delete(`/users/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user._id !== userId);
        updateUsers(updatedUsers); // Update localStorage
        return updatedUsers;
      });

      triggerToast({
        title: "User deleted successfully.",
        status: "success",
      });
    } catch {
      handleApiError("Error deleting user.");
    }
  }, [handleApiError, triggerToast]);

  // Update user data
  const handleUpdateUser = useCallback((updatedUser: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user._id === updatedUser._id ? { ...user, ...updatedUser } : user
      );
      updateUsers(updatedUsers); // Update localStorage
      return updatedUsers;
    });
  }, []);

  // Error handling for data fetching
  if (error) return <div>Error fetching users. Please try again later.</div>;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-500 mb-5">
        Users List
      </h1>
      <div className="space-y-6">
        {users?.map((user, index) => (
          <UserItem key={index} user={user} onDelete={handleDeleteUser} onSave={handleUpdateUser} />
        ))}
      </div>
      {isValidating && <Loading />}
      <div ref={elementRef} className="my-4">
        {data && data.length && !isValidating && (
          <button onClick={() => setSize(size + 1)} className="text-center">
            End of users
          </button>
        )}
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
