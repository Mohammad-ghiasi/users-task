import api from "@/utils/api";
import { FaTrash } from "react-icons/fa";
import { mutate } from "swr";
import Cookies from "js-cookie";
import { User } from "@/types/myTypes";
import { toast } from "react-toastify";
import Button from "./UI/Button";

export default function RemoveUser({ id }: { id: string }) {
  const token = Cookies.get("token");
  const userRemover = async (userId: string) => {
    try {
      await api
        .delete(`/users/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          mutate(
            "users",
            (prevdata: any) => {
              const updates = prevdata.users.filter(
                (user: User) => user._id !== userId
              );
              return { ...prevdata, users: [...updates] };
            },
            false
          );
          toast.success("User deleted successfuly.", {
            position: "top-center",
          });
        })
        .catch((err) => {
          mutate(
            "users",
            (prevdata: any) => {
              return prevdata;
            },
            false
          );
          toast.error("Faild to reomove user.", {
            position: "top-center",
          });
        });
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <Button
      onClick={() => userRemover(id)}
      className="ownstyle  pt-3"
    >
      <FaTrash color="red" />
    </Button>
    
  );
}
