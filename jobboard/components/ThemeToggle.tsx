"use client"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function ThemeToggle() {

    const { theme, setTheme } = useTheme()
    console.log(theme)

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
                    {theme === 'dark' ? (
                        <SunIcon color="black"></SunIcon>) : 
                        (<MoonIcon color="black"></MoonIcon>)}
                </button>
            </DropdownMenu.Trigger>
            {/* <DropdownMenu.Portal> */}
                <DropdownMenu.Content
                    className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
                    <DropdownMenu.Item onClick={() => setTheme('light')}>Light</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={() => setTheme('dark')}>Dark</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={() => setTheme('system')}>System</DropdownMenu.Item>
                </DropdownMenu.Content>
            {/* </DropdownMenu.Portal> */}
        </DropdownMenu.Root>
    )
}
