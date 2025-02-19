import AddressManager from "@/components/address/AddressManage";
import { propParams } from "@/types/myTypes";
import api from "@/utils/api";
import { cashDeleter } from "@/utils/cashDeleter";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { MdWork, MdOutlineDateRange } from "react-icons/md";

export default async function Page(props: propParams) {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const token: string | undefined = cookieStore.get("token")?.value;
  const userHashedId: string | undefined = cookieStore.get("hashedId")?.value;

  const { data } = await api.get(`/users/user/${props.params.userid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className=" mx-auto w-full bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-8 rounded-2xl border border-gray-200 mt-20">
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#7BAF97] to-[#4A7C59] text-white flex items-center justify-center text-4xl font-bold shadow-lg">
            {data.user.firstname[0]}
            {data.user.lastname[0]}
          </div>
          <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md"></span>
        </div>

        {/* User Information */}
        <div className="text-center space-y-3">
          <p className="text-xl sm:text-2xl font-semibold text-gray-900">
            {`${data.user.firstname} ${data.user.lastname}`}
          </p>
          <div className="flex flex-col items-start space-y-2">
            <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center">
              <FaEnvelopeOpenText className="mr-3 text-[#2d6a4f] text-xl" />
              {data.user.email}
            </p>
            <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center">
              <MdWork className="mr-3 text-[#2d6a4f] text-xl" />
              {data.user.job}
            </p>
            <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center">
              <MdOutlineDateRange className="mr-3 text-[#2d6a4f] text-xl" />
              Joined: {new Date(data.user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <AddressManager
          userId={data.user._id}
          initialAddresses={data.user.addresses}
          hashedId={userHashedId}
          token={token}
          cashDeleter={cashDeleter}
        />
      </div>
    </div>
  );
}
