import { InputProps } from "@/types/inputs";

export function InputLink({ ...props }: InputProps) {
    return (

        <div className="relative mb-3  ml-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-2xl text-default-400 pointer-events-none">
                {<props.icon />}
            </div>
            <input aria-label={props.label} type={props.type} name={props.id} id={props.id}
                className="bg-gray-50 border-underlined text-gray-900 text-sm rounded-lg 
                    focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder={props.placeholder} />
        </div>
    );
}

export function InputIcon({ label, ...props }: InputProps) {
    return (
        <>
            <div>
                {/* <label htmlFor={props.id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label> */}
                <div className="relative mb-2">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-2xl text-default-400 pointer-events-none flex-shrink-0">
                        {<props.icon />}
                    </div>
                    <input type={props.type} name={props.id} id={props.id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5  
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder={props.placeholder} />
                </div>
            </div>
        </>
    );
}