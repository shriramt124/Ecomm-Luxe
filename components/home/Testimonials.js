export default function Testimonials() {
    const testimonials = [
        {
            content: "The quality of products exceeded my expectations. Will definitely shop again!",
            author: "Sarah Johnson",
            role: "Verified Buyer"
        },
        {
            content: "Outstanding customer service and fast delivery. Highly recommended!",
            author: "Michael Chen",
            role: "Verified Buyer"
        },
        {
            content: "Best online shopping experience I've had in years. The products are amazing!",
            author: "Emma Davis",
            role: "Verified Buyer"
        }
    ];

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                    What Our Customers Say
                </h2>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                            <div className="flex flex-col gap-y-4">
                                <p className="text-lg text-gray-600">{testimonial.content}</p>
                                <div className="mt-auto">
                                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
