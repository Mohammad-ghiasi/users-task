import Link from "next/link";
import Button from "./UI/Button";

export default function Hero() {
  return (
    <section className="text-gray-700 py-20 flex flex-col items-center space-y-7 md:space-y-11 text-center mb-[-80px] shadow-md">
      <h1 className="text-4xl md:text-6xl font-bold">
        Welcome to Infinite Scrolling
      </h1>
      <p className=" text-lg md:text-2xl">
        Explore endless user information with infinite scrolling
      </p>
      <div>
        <Link href="/users">
        <Button className="px-6 py-3">
        View Users
        </Button>
          {/* <button className="px-6 py-3 text-white bg-[#2d6a4f] font-semibold rounded-lg hover:bg-[#4A7C59] transition-all">
            View Users
          </button> */}
        </Link>
      </div>
    </section>
  );
}
