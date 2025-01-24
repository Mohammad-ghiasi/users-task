import api from "@/utils/api";
import { cookies } from "next/headers";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

type propParams = { params: { userid: string }; searchParams: {} };

export default async function page(props: propParams) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;


  const { data } = await api.get(`/users/user/${props.params.userid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
      <div className="flex flex-col space-y-4 items-center">
        <div className="w-16 h-16 sm:w-24 sm:h-24 sm:me-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mb-4 sm:mb-0">
          {data.user.firstname[0]}
          {data.user.lastname[0]}
        </div>

        <div className="flex-grow space-y-2">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
            {`${data.user.firstname} ${data.user.lastname}`}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 flex items-center">
            <FaEnvelope className="mr-2" />
            {data.user.email}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            {data.user.job}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            Joined: {new Date(data.user.createdAt).toLocaleDateString()}
          </p>
        </div>

     
      </div>
    </div>
  );
}
