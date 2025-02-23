export default function Avatar({ firstname, lastname }: { firstname: string, lastname: string }) {
  return (
    <div className="relative">
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#2E614C] to-[#4A7C59] text-white flex items-center justify-center text-4xl font-bold shadow-lg">
        {firstname}
        {lastname}
      </div>
      <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md"></span>
    </div>
  );
}
