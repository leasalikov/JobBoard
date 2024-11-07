"use client";
import React, { FormEvent, useState } from "react";
import { Select, SelectItem, Input, Image, Avatar, Radio } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { IconType } from "react-icons";
import { TbFileUpload } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { MdOutlineAddBox } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FiAlignLeft } from "react-icons/fi";
import { FaBusinessTime } from "react-icons/fa6";

import router from "next/router";


export default function EmployerEditProfile() {
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
        const LinkArray: { name: string; value: string }[] = [];

        formData.forEach((value, name) => {
            if (name == "website" || name == "facebook" || name == "twitter" || name == "instgram") {
                LinkArray.push({ name, value: value.toString() });
            }
        });

        const values = {
            image: "formData.get('userImage')?.toString()",
            phone: formData.get('userPhone'),
            company: {
                name: formData.get("companyName"),
                phone: formData.get("companyphone"),
                logo: "cgvh",
                description: formData.get("CompanyDescription"),
                expertise: formData.getAll('expertise'),
                size: formData.get('teamSize'),
                links: LinkArray,
                email: formData.get('companyEmail')
            }

        };

        try {
            const response = await fetch(`http://localhost:3000/api/employers/${session?.data?.user?.email}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        // <div>
        <div className=" mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile
                </h2>
            </div> */}
            {/* flex flex-col items-center w-16 pb-4 overflow-auto  mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> */}
            <form onSubmit={register} className="space-y-6" action="#" method="POST">



                <div className="grid grid-col-4 grid-rows-2 gap-10">
                    <div className=" row-start-1 row-span-3 col-start-1 col-span-1">

                        {/* <div className="col-span-full"> */}
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Your profile image</label>
                        <p className="font-semibold text-gray-900">Click on the image to change it.</p>
                        <label className="mt-10 flex items-center ">
                            <Avatar className="w-40 h-40 " isBordered showFallback src={image} />
                            <input id="add-img" name="photo" type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                        {/* </div> */}

                        <div>
                            <label htmlFor="userPhone" className="text-sm font-medium leading-6 text-gray-900">Your phone</label>
                            <div className="mt-2">
                                <input id="userPhone" name="userPhone" type="tel" className="  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row-start-1 row-span-2 col-start-3 col-span-1">
                 */}
                
                {/* <div className=" row-start-1 row-span-2 col-start-4 col-span-1">

                    <div className="grid grid-cols-2 gap-3">
                        <h2 className="mt-15 text-left  text-2xl font-bold leading-9 tracking-tight text-indigo-600">Company details:</h2>
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">Company name</label>
                            <div className="mt-2">
                                <input id="companyName" name="companyName" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="CompanyDescription" className="block text-sm font-medium leading-6 text-gray-900">Company description</label>
                            <textarea name="CompanyDescription" id="CompanyDescription" required className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Write your description here..."></textarea>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="logo" className="block text-sm font-medium leading-6 text-gray-900">Logo</label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <label className="mt-2 flex items-center gap-x-3 ">
                                    <Avatar isBordered showFallback src={image} />
                                    <a className="font-semibold text-indigo-600 hover:text-indigo-500">Choose image</a>
                                    <input id="add-img" name="logo" type="file" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        </div>
                        <div>
                            <Select placeholder="select..." label="Company areas of occupation" labelPlacement="outside-left" selectionMode="multiple" className="block w-full" name="expertise">
                                {specialization.map((area) => (
                                    <SelectItem key={area}>{area}</SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="teamSize" className="block text-sm font-medium leading-6 text-gray-900">Team Size</label>
                            <div className="mt-2">
                                <input id="teamSize" name="teamSize" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className=" row-start-1 row-span-2 col-start-2 col-span-2"></div> */}


                {/* </div> */}
                {/* 
                <div className="col-span-2 col-start-2 row-start-2 row-span-2 mt-10">
                    </div> */}


                <button type="submit" className="flex justify-center  rounded-md bg-indigo-600 px-3 py-1.5
                         text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save changes</button>
            </form>
        </div >
    );
}

type InputProps = {
    ariaLabel: string;
    icon: IconType;
    id: string;
    type: string;
    placeholder: string;
};

function InputLink({ ...props }: InputProps) {
    return (

        <div className="relative mb-3  ml-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-2xl text-default-400 pointer-events-none">
                {<props.icon />}
            </div>
            <input aria-label={props.ariaLabel} type={props.type} name={props.id} id={props.id
            }
                className="bg-gray-50 border-underlined text-gray-900 text-sm rounded-lg 
                    focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder={props.placeholder} />
        </div>
    );
}



