"use client"
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


function forgotPassword() {
    const [verify, setVerify] = useState(false)
    const [email, setEmail] = useState(null)
    const router = useRouter()
    
    async function updatePassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        const values = {
            OTP: target.otp.value,
            newPassword: target.password.value
        }
        try {
            const response = await fetch(`http://localhost:3000/api/users/${email}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            try {
                const credential = await signIn("credentials", { ...values, callbackUrl: "/" });
                console.log("credential", credential);
              } catch (error) {
                console.log(error);
              }
            // router.push('/')

        } catch (error) {
            console.log(error);
        }
    }
    async function sendEmail() {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        console.log(target.email.value)
        setVerify(true);
        setEmail(target.email.value)
        sendEmail()
    }
    return (
        <div className="flex min-h-full flex-col justify-center mt-10 px-6 py-12 lg:px-8">
            <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">{verify ? "Email verification " : "Password recovery "}
            </h2>
            <div className=" justify-center sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={!verify ? handleSubmit : updatePassword} className="space-y-6" action="#" method="POST">
                    {!verify &&
                        <InputLogin
                            label="Enter your email"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="email@gmail.com"
                        />}

                    {verify && <div>
                        {/* <p className="text-left text-sm text-gray-500">A code was sent to {email}. Please insert it here: </p> */}
                        <InputLogin
                            label={`A code was sent to ${email}. Please insert it here:`}
                            type="text"
                            id="otp"
                            name="otp"
                            placeholder="verification code"

                        />
                        <InputLogin
                            label="New password"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="***********"
                        />

                    </div>
                    }

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{verify ? "Update password" : "continue"}</button>
                    </div>
                </form>
                {verify && <p className="mt-10 text-center text-sm text-gray-500">Email not received?  <a href="#" onClick={sendEmail} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Send again!
                </a> </p>}
            </div>
        </div >
    )
}

type InputLoginProps = {
    label: string;
    type: string;
    id: string;
    name: string;
    placeholder: string;
};

function InputLogin({ label, ...props }: InputLoginProps) {
    return (
        <>
            <div className="mt-5">
                <label htmlFor={props.name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
                <div className="mt-2">
                    <input {...props} required placeholder={props.placeholder} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
        </>
    );
}

export default forgotPassword