"use client";

import React, { FormEvent, useState } from "react";
import { Resend } from 'resend';


export default function Contact() {
    const [isContact, setIsComtact] = useState(false)

    async function contact(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        setIsComtact(true)
        const values = {
            name: target.username.value,
            phone: target.phone.value,
            email: target.email.value,
            //@ts-ignore
        };
        console.log("vaaaaa ", values)
        
        // 
        // Here we have to send email!!
        //
        
    }

    return (
        <div className="relative isolate">
            {/*  px-6 pt-14 lg:px-8 */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>                </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Contact us:)</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Here you can contact us with any question, problem or malfunction.<br />
                        We will be happy to be at your service!<br /><br /></p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">Please fill in your details and we will get back to you as soon as possible<br /></p>
                </div>
                {!isContact &&
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={contact} className="space-y-6" action="#" method="POST">
                            <input placeholder="Your name" id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <input placeholder="Phone" id="phone" name="phone" type="tel" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <input placeholder="Email" id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send</button>
                            </div>
                        </form>
                    </div>}
                {isContact &&
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <p className="flex justify-center items-center font-bold tracking-tight text-gray-400 sm:text-3xl">Your details have been sent!</p>
                    </div>}
            </div>
        </div>
    );
}
