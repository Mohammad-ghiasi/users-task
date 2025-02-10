export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800">What We Offer</h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
        {[
          {
            title: "Users List",
            description: "Explore an endless list of users.",
          },
          {
            title: "Access User Info",
            description: "View detailed profiles of each user.",
          },
          {
            title: "Infinite Scrolling",
            description: "Seamlessly scroll through endless content.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg text-center border border-gray-200 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-[#2d6a4f]">{feature.title}</h3>
            <p className="mt-4 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
