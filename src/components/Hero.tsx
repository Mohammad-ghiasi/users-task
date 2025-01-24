import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-gray-500 py-20 text-center shadow-md">
      <h1 className="text-4xl md:text-6xl font-bold">
        Welcome to Infinite Scrolling
      </h1>
      <p className="mt-4 text-lg md:text-2xl">
        Explore endless user information with infinite scrolling
      </p>
      <div className="mt-6">
        <Link href="/users">
          <button className="px-6 py-3 text-gray-600 bg-gray-300 font-semibold rounded-lg hover:bg-gray-200">
            View Users
          </button>
        </Link>
      </div>
    </section>
  );
}
