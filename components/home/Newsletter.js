export default function Newsletter() {
    return (
        <section className="bg-gray-50 py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-purple-900 px-6 py-16 sm:p-16">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            Join Our Newsletter
                        </h2>
                        <p className="mt-4 text-lg text-purple-200">
                            Subscribe to get special offers, free giveaways, and updates about our latest products.
                        </p>
                        <form className="mt-10">
                            <div className="flex max-w-md mx-auto gap-x-4">
                                <input
                                    type="email"
                                    required
                                    className="min-w-0 flex-auto rounded-full border-0 bg-white/5 px-6 py-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-purple-200 focus:ring-2 focus:ring-inset focus:ring-white"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="submit"
                                    className="flex-none rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-900 shadow-sm hover:bg-purple-100"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}