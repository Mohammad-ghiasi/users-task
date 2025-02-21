import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Button from "../UI/Button";
import { FaSignOutAlt } from "react-icons/fa";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
    setTimeout(() => {
      Cookies.remove("token");
      window.location.reload();
    }, 1000);
  };
  return (
    <Button
      onClick={handleLogout}
      className="ownstyle w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
    >
      <FaSignOutAlt className="mr-2" />
      Logout
    </Button>
  );
}
