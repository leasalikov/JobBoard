"use client";
import React from "react";
import EmployerRegistration from "@/components/forms/EmployerRegistration";
import JobSearcherRegistration from "@/components/forms/JobSearcherRegistration";
import { useSession } from 'next-auth/react';

export default function Register() {
  const session = useSession();
  const  userType = session?.data?.user?.type as string;
  console.log(userType)

return (<>
    {userType=="employer"?<EmployerRegistration/>:<JobSearcherRegistration/>}
    </>
)
}




