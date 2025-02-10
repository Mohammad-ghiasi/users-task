import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-gray-700 py-20 text-center shadow-md">
      <h1 className="text-4xl md:text-6xl font-bold">
        Welcome to Infinite Scrolling
      </h1>
      <p className="mt-4 text-lg md:text-2xl">
        Explore endless user information with infinite scrolling
      </p>
      <div className="mt-6">
        <Link href="/users">
          <button className="px-6 py-3 text-white bg-[#2d6a4f] font-semibold rounded-lg hover:bg-[#4A7C59] transition-all">
            View Users
          </button>
        </Link>
      </div>
    </section>
  );
}
