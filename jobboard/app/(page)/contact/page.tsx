import React from "react";
import Nav from "@/components/section/Nav";
import Link from "next/link";
import { Suspense } from "react";

export default function Contact() {

    return (
        <div><Nav />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Contact us:)</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Here you can contact us with any question, problem or malfunction.<br />
                            We will be happy to be at your service!<br /><br /></p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">Email: jobboard@gmail.com<br />
                            Phone: 123456789<br /></p>
                    </div>
                </div>
            </div>
        </div>
    );
}