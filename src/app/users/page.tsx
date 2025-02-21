import { cookies } from "next/headers";
import api from "@/utils/api";
// import UserPageComponent from "@/components/users/UserPageComponent";
import dynamic from "next/dynamic";

const UserPageComponent = dynamic(() => import("@/components/users/UserPageComponent"), { 
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default async function UserPage() {
  const token = cookies().get("token")?.value;

  const response = await api.get("/users/users?page=1&limit=10", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const users = response.data; // داده‌های کاربران

  return <UserPageComponent users={users} />;
}
