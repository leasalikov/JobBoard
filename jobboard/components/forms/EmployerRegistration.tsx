"use client";
import React, { FormEvent, useState } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { IconType } from "react-icons";
import { TbWorld } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { InputIcon } from "@/functions/formInputs";


export default function EmployerRegistration() {
    const session = useSession();
    const profileImg = session.data?.user?.image as string;

    const specialization: String[] = ["Accounting", "Finance", "Human Resource", "Sales", "Marketing", "Art", "Media", "Communications",
        "Services", "Retail", "Food & Beverages", "Hospitality", "Education"];
    const [companyImage, setCompanyImage] = useState<string>("https://images.unsplash.com/broken");
    const [userImg, setUserImg] = useState<string>(profileImg?profileImg:"https://images.unsplash.com/broken");
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

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className=" mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={register} className="space-y-6" action="#" method="POST">
                    <h3 className="mt-10 text-left  text-2xl font-bold leading-9 tracking-tight text-indigo-600">Personal details</h3>

                    <div className="col-span-full">
                        <label htmlFor="userImage" className="block text-sm font-medium leading-6 text-gray-900">Your profile image</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <label className="mt-2 flex items-center gap-x-3 ">
                                <Avatar isBordered showFallback src={userImg} />
                                <a className="font-semibold text-indigo-600 hover:text-indigo-500">Choose image</a>
                                <input id="add-img" name="userImage" type="file" className="hidden" onChange={handleUserImgUpload} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="userPhone" className="block text-sm font-medium leading-6 text-gray-900">Your phone</label>
                        <div className="mt-2">
                            <input id="userPhone" name="userPhone" type="tel" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

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
                                <Avatar isBordered showFallback src={companyImage} />
                                <a className="font-semibold text-indigo-600 hover:text-indigo-500">Choose image</a>
                                <input id="add-img" name="logo" type="file" className="hidden" onChange={handleCompanyImageUpload} />
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

                    <h3>Links to social networks:</h3>
                    <InputIcon label="website" icon={TbWorld} id="website" type="text" placeholder="https://company.com" />
                    <InputIcon label="facebook" icon={SiFacebook} id="facebook" type="text" placeholder="name@company.com" />
                    <InputIcon label="Twitter" icon={FaTwitter} id="twitter" type="text" placeholder="name@company.com" />
                    <InputIcon label="Instgram" icon={AiFillInstagram} id="instgram" type="text" placeholder="name@company.com" />

                    <p>Contact information for jobs:</p>
                    <InputIcon label="companyEmail" icon={MdEmail} id="companyEmail" type="email" placeholder="name@company.com" />
                    <InputIcon label="companyphone" icon={FaSquarePhone} id="companyphone" type="text" placeholder="000-000-0000" />

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                         text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    You can set and edit the information at any time<br />
                </p>
            </div>
        </div >
    );
}


// type InputProps = {
//     label: string;
//     icon: IconType;
//     id: string;
//     type: string;
//     placeholder: string;
// };

// function InputIcon({ label, ...props }: InputProps) {
//     return (
//         <>
//             <div>
//                 {/* <label htmlFor={props.id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label> */}
//                 <div className="relative mb-2">
//                     <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-2xl text-default-400 pointer-events-none flex-shrink-0">
//                         {<props.icon />}
//                     </div>
//                     <input type={props.type} name={props.id} id={props.id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
//                     focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  
//                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
//                      dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder={props.placeholder} />
//                 </div>
//             </div>
//         </>
//     );
// }




