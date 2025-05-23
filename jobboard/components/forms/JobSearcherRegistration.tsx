"use client";
import React, { FormEvent, useState } from "react";
import { Select, SelectItem,  Avatar } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { FaRegFileLines } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { InputLink } from "@/functions/formInputs";

export default function JobSearcherRegistration() {

    const [cvUploaded, setCvUploaded] = useState<boolean>(false);
    const [profile, setProfile] = useState<string>("")
const [file, setFile]=useState<File|null>(null)
    const [resume, setResume] = useState<string>("");
    const session = useSession();
    const profileImg = session.data?.user?.image as string;
    const [image, setImage] = useState<string>(profileImg?profileImg:"https://images.unsplash.com/broken");

    const router = useRouter()
    const experience = [
        { value: "No experience", label: "No experience" },
        { value: "1-2 years", label: "1-2 years" },
        { value: "3-5 years", label: "3-5 years" },
        { value: "5+ years", label: "5+ years" }]
    const specialization = [
        { value: "software", label: "software" },
        { value: "marketing", label: "merketing" },
        { value: "sales", label: "sales" },
        { value: "AI", label: "AI" },
        { value: "syber", label: "syber" },
        { value: "QA", label: "QA" },
        { value: "hardware", label: "hardware" },
        { value: "finance", label: "finance" },
        { value: "network", label: "network" },
        { value: "operating system", label: "operating system" },
        { value: "information security", label: "information security" },
        { value: "sport", label: "sport" },
        { value: "design", label: "design" },
        { value: "medicine", label: "medicine" },
        { value: "touring", label: "touring" },
    ];

    const skills = [{ value: "planning", label: "planning" },
    { value: "Brainstorming", label: "Brainstorming" },
    { value: "persuasion", label: "persuasion" },
    { value: "logic", label: "logic" },
    { value: "decision making", label: "decision making" },
    { value: "organization", label: "organization" },
    { value: "professionalism", label: "professionalism" },
    { value: "reliability", label: "reliability" },
    { value: "responsibility", label: "responsibility" },
    { value: "project management", label: "project management" },
    { value: "Recruitment", label: "Recruitment" }];
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const uploadedImage = URL.createObjectURL(e.target.files[0]);
            const formData = new FormData();
            formData.append("filepond", e.target.files[0]);
            try {
                const response = await fetch(`http://localhost:3000/api/cloudinary`, {
                    method: "POST",
                    body: formData
                })
                const data = await response.json();
                setProfile(data.imgUrl)
                setImage(uploadedImage);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {
            setCvUploaded(true);
            setFile(e.target.files[0])
            const formData = new FormData();
            formData.append("filepond", e.target.files[0]);
            try {
                const response = await fetch(`http://localhost:3000/api/cloudinary`, {
                    method: "POST",
                    body: formData
                })
                const data = await response.json();
                setResume(data.imgUrl)
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function register(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const selectedSkills = formData.getAll('skills');
        const email = formData.getAll("email");
        const phone = formData.getAll("phone");
        const PreviousWorks = [];
        for (let i = 0; i < email.length; i++) {
            PreviousWorks.push({ email: email[i], phone: phone[i] })
        }
        const values = {
            phone: formData.get('userPhone'),
            image: profile,
            skills: selectedSkills,
            resume: [resume],
            expertise: formData.getAll('expertise'),
            experience: formData.get('experience'),
            recommendations: PreviousWorks,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/jobsearcher/${session?.data?.user?.email}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data)
            router.push('/')

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Your Profile
                </h2>
                <p className="mt-5 text-center text-sm text-gray-600">
                    You can set and edit your profile information at any time
                    {/* <a href="/home" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">skip
                    </a> */}
                </p>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={register} className="space-y-6" action="#" method="POST">
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Profile image</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <label className="mt-2 flex items-center gap-x-3 ">
                                <Avatar isBordered showFallback src={image} />
                                <a  className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500">Choose image</a>
                                <input id="add-img" name="photo" type="file" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <Select
                            label="Your prominent skills"
                            labelPlacement="outside-left"
                            placeholder="Select 3 skills"
                            selectionMode="multiple"
                            className="block w-full"
                            name="skills"
                        >
                            {skills.map((skill) => (
                                <SelectItem
                                    key={skill.value} value={skill.value}>
                                    {skill.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Select
                            label="Your area of expertise"
                            labelPlacement="outside-left"
                            placeholder="Select..."
                            selectionMode="multiple"
                            className="block w-full"
                            name="expertise"
                        >
                            {specialization.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    {!cvUploaded && <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload CV</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
                            </div>
                            <input name="cv" id="dropzone-file" required type="file" accept="pdf, docx, PDF, DOC" className="hidden" onChange={handleCVUpload} />
                        </label>
                    </div>}

                    {cvUploaded && (
                        <div className="flex border border-gray-400  text-sm rounded-lg 
                    focus:ring-indigo-500 focus:border-indigo-500 block ps-4 p-1.5">
                            <div className="relative inset-y-0 start-0 flex items-center text-5xl ">
                                {/* <TbFileUpload /> */}
                                <FaRegFileLines className="text-gray-600" />
                            </div>
                            <div className="relative mb-3 ">
                                <p className=" text-x ml-2 mt-2">{file?.name}</p>
                                <p className=" text-x ml-2 mt-2">{file?.size} byts</p>
                            </div>
                        </div>
                    )}

                    <div className="sm:col-span-3">
                        <Select
                            label="Experience"
                            labelPlacement="outside-left"
                            placeholder="Your experience"
                            selectionMode="single"
                            className="block w-full"
                            name="experience"
                        >
                            {experience.map((option) => (
                                <SelectItem
                                    key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="userPhone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                        <div className="mt-2">
                            <input id="userPhone" name="userPhone" type="tel" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <p>Recommendations (Optional)</p>

                    <div className="flex">
                        <InputLink label="Email" icon={MdEmail} id="email" type="text" placeholder="name@company.com" />
                        <InputLink label="Phone" icon={FaSquarePhone} id="phone" type="text" placeholder="000-000-0000" />
                    </div>

                    <div className="flex">
                        <InputLink label="Email" icon={MdEmail} id="email" type="text" placeholder="name@company.com" />
                        <InputLink label="Phone" icon={FaSquarePhone} id="phone" type="text" placeholder="000-000-0000" />
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                         text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>

            </div >
        </div >

    );
}






