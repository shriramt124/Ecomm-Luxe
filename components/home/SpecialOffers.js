export default function SpecialOffers() {
  return (
    <section className="bg-purple-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Special Offer
            </h2>
            <p className="mt-4 text-lg text-purple-200">
              Get 20% off on your first purchase. Use code WELCOME20 at checkout.
            </p>
            <button className="mt-8 w-fit rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-900 hover:bg-purple-100">
              Shop Now
            </button>
          </div>
          <div className="relative">
            <img
              src="/api/placeholder/800/600"
              alt="Special offer"
              className="rounded-2xl"
            />
            <div className="absolute -right-4 -top-4 rounded-full bg-yellow-400 p-4 text-2xl font-bold text-purple-900">
              20% OFF
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
