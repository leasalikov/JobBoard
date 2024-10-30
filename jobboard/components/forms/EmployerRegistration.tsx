"use client";
// import React from "react";
"use client"
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import React, { FormEvent, useState } from "react";
// import { signIn } from "next-auth/react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { IconType } from "react-icons";
import { TbWorld } from "react-icons/tb";


export default function EmployerRegistration() {
    const specialization: String[] = ["Accounting", "Finance", "Human Resource", "Sales", "Marketing", "Art", "Media", "Communications",
        "Services", "Retail", "Food & Beverages", "Hospitality", "Education"];
        const [image, setImage] = useState<string>("https://images.unsplash.com/broken");

        const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const uploadedImage = URL.createObjectURL(e.target.files[0]);
                console.log(image)
                setImage(uploadedImage);
            }
        };
    
    
    


    async function register(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // const values = {
        //     // name: target.name.value,
        //     facebook: target.facebook.value,
        //     instgram: target.instgram.value,
        //     twitter: target.twitter.value,
        //     phone: target.phone.value,
        //     email: target.email.value,
        // };


        // const linkName = formData.getAll("link");
        // // const link = formData.getAll("phone");
        // const links = [];
        // for (let i = 0; i < linkName.length; i++) {
        //     links.push({ linkName: linkName[i], link: link[i] })
        // }
        const values = {
            phone: formData.get('phone'),
            email: formData.get('photo'),
            // links: links,
        };
        try {
            alert(values);
            console.log("values", values)

            //   const response = await fetch("http://localhost:3000/api/register", {
            //     method: "POST",
            //     body: JSON.stringify(values),
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //   });
            //   const data = await response.json();
            //   console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Your Company Profile</h2>
            </div>

            <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={register} className="space-y-6" action="#" method="POST">


                    <div>
                        <label htmlFor="CompanyDescription" className="block text-sm font-medium leading-6 text-gray-900">Company description</label>
                        <textarea id="CompanyDescription" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Write your description here..."></textarea>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="logo" className="block text-sm font-medium leading-6 text-gray-900">Logo</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                            </svg>

                            <div>
                                <label className="flex flex-col items-center justify-center w-full h-70 ">
                                    <a className="font-semibold text-indigo-600 hover:text-indigo-500">Choose  your logo image</a>
                                    <input id="add-img" name="logo" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Select
                            label="Company areas of occupation"
                            labelPlacement="outside-left"
                            selectionMode="multiple"
                            className="block w-full"
                            name="expertise"
                        >
                            {specialization.map((area) => (
                                <SelectItem key={area}>
                                    {area}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="teamSize" className="block text-sm font-medium leading-6 text-gray-900">Team Size</label>
                        <div className="mt-2">
                            <input id="teamSize" name="teamSize" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <InputIcon
                        label="website"
                        icon={TbWorld}
                        id="website"
                        type="text"
                        placeholder="https://company.com"
                    />

                    <InputIcon
                        label="facebook"
                        icon={SiFacebook}
                        id="facebook"
                        type="text"
                        placeholder="name@company.com"
                    />

                    <InputIcon
                        label="Twitter"
                        icon={FaTwitter}
                        id="twitter"
                        type="text"
                        placeholder="name@company.com"
                    />

                    <InputIcon
                        label="Instgram"
                        icon={AiFillInstagram}
                        id="instgram"
                        type="text"
                        placeholder="name@company.com"
                    />

                    <p>Contact information for jobs:</p>

                    <InputIcon
                        label="Email"
                        icon={MdEmail}
                        id="email"
                        type="text"
                        placeholder="name@company.com"
                    />

                    <InputIcon
                        label="phone"
                        icon={FaSquarePhone}
                        id="phone"
                        type="text"
                        placeholder="000-000-0000"
                    />

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                         text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    You can set and edit your company profile information at any time<br />
                    <a href="/home" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Skip</a>
                </p>
            </div>
        </div >
    );
}


type InputProps = {
    label: string;
    icon: IconType;
    id: string;
    type: string;
    placeholder: string;
};

function InputIcon({ label, ...props }: InputProps) {
    return (
        <>
            <div>
                <label htmlFor={props.id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <div className="relative mb-3">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-2xl text-default-400 pointer-events-none flex-shrink-0">
                            {<props.icon />}
                        </div>
                    <input type={props.type}  name="link" id={props.id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder={props.placeholder} />
                </div>
            </div>
        </>
    );
}




