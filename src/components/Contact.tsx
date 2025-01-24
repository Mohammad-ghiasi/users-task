import Link from "next/link";

export default function Contact() {
  return (
    <section className="shadow-md text-gray-500 py-16 text-center">
      <h2 className="text-3xl font-bold">Get in Touch</h2>
      <p className="mt-4">We love to hear from you!</p>
      <div className="mt-6">
        <Link href="/about">
          <button className="px-6 py-3 text-gray-600 bg-gray-300 font-semibold rounded-lg hover:bg-gray-200">
            More about me
          </button>
        </Link>
      </div>
    </section>
  );
}
