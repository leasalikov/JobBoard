"use client"
import React from 'react'
import EmployerEditProfile from '@/components/forms/EmployerEditProfile'
import JobSearcherEditProfile from '@/components/forms/JobSearcherEditProfile'
import { useSession } from 'next-auth/react';

function Profile() {
  const session = useSession();
  // const userType = session?.data?.user?.type as string;
  const userType = (session?.data?.user as { type?: string })?.type;
  return (
    <>  {userType == "employer" ?<EmployerEditProfile />: userType=="jobsearcher"?<JobSearcherEditProfile/>:null
      }
    </>

  )
}

export default Profile
