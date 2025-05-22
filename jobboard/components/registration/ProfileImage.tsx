"use client"
import * as Avatar from "@radix-ui/react-avatar"
import { PersonIcon } from "@radix-ui/react-icons"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";

export default function ProfileImage() {
    const session = useSession();
    const userImg = session.data?.user?.image as string;
    console.log("session: ", session)
    // const userType = session.data?.user?.type as string;
    const userType = (session.data?.user as any)?.type;
    console.log("user type:", userType);    

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Avatar.Root className="inline-flex size-[40px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle fixed left-0 top-0 ml-4 mt-4">
                    {userImg && (
                        <button>
                            <Avatar.Image
                                className="size-full rounded-[inherit] object-cover"
                                src={userImg}
                                alt="Colm Tuite"
                            />
                        </button>
                    )}
                    {!userImg && (
                        <button>
                            <Avatar.Root className="size-full rounded-[inherit] object-cover">
                                <PersonIcon />
                            </Avatar.Root>
                        </button>
                    )}
                </Avatar.Root>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side:right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
                <DropdownMenu.Item>
                    <a href="/Profile">My Profile</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <button onClick={() => signOut()}>Log out</button>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
            <DropdownMenu.Root />
        </DropdownMenu.Root>
    );
}
