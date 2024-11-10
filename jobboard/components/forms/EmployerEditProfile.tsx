"use client";
import React, { FormEvent, useState } from "react";
import { Select, SelectItem, Input, Image, Avatar, Radio } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone, FaTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";
import { TbFileUpload, TbWorld } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { MdOutlineAddBox } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FiAlignLeft } from "react-icons/fi";
import { FaBusinessTime } from "react-icons/fa6";

import router from "next/router";
import { InputIcon } from "@/functions/formInputs";
import { SiFacebook } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";


export default function EmployerEditProfile() {
    const session = useSession();
    const profileImg = session.data?.user?.image as string;

    const specialization: String[] = ["Accounting", "Finance", "Human Resource", "Sales", "Marketing", "Art", "Media", "Communications",
        "Services", "Retail", "Food & Beverages", "Hospitality", "Education"];
    const [companyImage, setCompanyImage] = useState<string>("https://images.unsplash.com/broken");
    const [userImg, setUserImg] = useState<string>(profileImg ? profileImg : "https://images.unsplash.com/broken");
    const handleUserImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {
            const formData = new FormData();
            formData.append("filepond", e.target.files[0]);
            try {
                const response = await fetch(`http://localhost:3000/api/cloudinary`, {
                    method: "POST",
                    body: formData
                })
                const data = await response.json();
                setUserImg(data.imgUrl)
            } catch (error) {
                console.log(error)
            }
        };
    }
    const handleCompanyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const formData = new FormData();
            formData.append("filepond", e.target.files[0]);
            try {
                const response = await fetch(`http://localhost:3000/api/cloudinary`, {
                    method: "POST",
                    body: formData
                })
                const data = await response.json();
                setCompanyImage(data.imgUrl);
            } catch (error) {
                console.log(error);
            }
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
            image: userImg,
            phone: formData.get('userPhone'),
            company: {
                name: formData.get("companyName"),
                phone: formData.get("companyphone"),
                logo: companyImage,
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
        <div className=" ml-10 mr-10 mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile
            </h2>
        </div> */}
            {/* flex flex-col items-center w-16 pb-4 overflow-auto  mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> */}
            <form onSubmit={register} className="space-y-6" action="#" method="POST">
                <div className="grid grid-rows-3 grid-col-3 gap-4 mt-10">
                    <div className="row-span-2 row-start-1 col-start-1 col-span-1">
                    <h2 className="mt-15 text-left  text-2xl font-bold leading-9 tracking-tight text-indigo-600">Personal details:</h2>
                        {/* row-start-1 row-span-3 col-start-1 col-span-1"> */}
                        <div className="col-span-full">
                            <label htmlFor="photo" className=" text-sm font-medium leading-6 text-gray-900">Your profile image</label>
                            <p className="font-semibold text-gray-900">Click on the image to change it.</p>
                            <label className="mt-10 flex items-center ">
                                <Avatar className="w-20 h-20" isBordered showFallback src={userImg} />
                                <input id="add-img" name="photo" type="file" className="hidden" onChange={handleUserImgUpload} />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="userPhone" className="text-sm font-medium leading-6 text-gray-900">Your phone</label>
                            <div className="mt-2">
                                <input id="userPhone" name="userPhone" type="tel" className="  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div className="row-span-2 row-start-1 col-start-2 col-span-1">
                        <h2 className="mt-15 text-left  text-2xl font-bold leading-9 tracking-tight text-indigo-600">Company details:</h2>
                        <label htmlFor="logo" className="block text-sm font-medium leading-6 text-gray-900">Logo</label>
                        <div className="mt-2 mb-2 flex items-center gap-x-3">
                            <label className="mt-2 flex items-center gap-x-3 ">
                                <Avatar className="w-20 h-20" isBordered showFallback src={companyImage} />
                                <a className="font-semibold text-indigo-600 hover:text-indigo-500">Choose image</a>
                                <input id="add-img" name="logo" type="file" className="hidden" onChange={handleCompanyImageUpload} />
                            </label>
                        </div>
                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">Company name</label>
                        <div className="mt-2">
                            <input id="companyName" name="companyName" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <label htmlFor="CompanyDescription" className="block text-sm font-medium leading-6 text-gray-900">Company description</label>
                        <textarea name="CompanyDescription" id="CompanyDescription" required className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Write your description here..."></textarea>
                  
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
               
                    <div className="row-span-2 row-start-1 col-start-4 col-span-1 mt-10">
                        <h3>Links to social networks:</h3>
                        <InputIcon label="website" icon={TbWorld} id="website" type="text" placeholder="https://company.com" />
                        <InputIcon label="facebook" icon={SiFacebook} id="facebook" type="text" placeholder="name@company.com" />
                        <InputIcon label="Twitter" icon={FaTwitter} id="twitter" type="text" placeholder="name@company.com" />
                        <InputIcon label="Instgram" icon={AiFillInstagram} id="instgram" type="text" placeholder="name@company.com" />

                        <p>Contact information for jobs:</p>
                        <InputIcon label="companyEmail" icon={MdEmail} id="companyEmail" type="email" placeholder="name@company.com" />
                        <InputIcon label="companyphone" icon={FaSquarePhone} id="companyphone" type="text" placeholder="000-000-0000" />

                    </div>
                </div>




                <button type="submit" className="flex justify-center  rounded-md bg-indigo-600 px-3 py-1.5
                         text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save changes</button>
            </form >
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



