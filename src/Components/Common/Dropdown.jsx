import {useTranslation} from "react-i18next";
import {ChevronDownIcon} from "@heroicons/react/24/solid";

export default function Dropdown({options, handleClick, defaultName, value})
{
    const {t} = useTranslation();

    return (
        <div className="dropdown dropdown-bottom dropdown-end w-full ">
            <div tabIndex={0} role="button" className="flex justify-between py-3 px-6 w-full border border-neutral-300 bg-neutral-200 rounded-xl text-neutral-700">
                <span>{value ? value : defaultName}</span>
                <ChevronDownIcon className='w-6 h-6' />
            </div>
            <ul tabIndex={0} className="dropdown-content z-50 menu p-3 cursor-pointer shadow border border-neutral-300 bg-white rounded-box w-[75%]">
                {options.map(option =>
                    <li onClick={() => handleClick(option)}
                        className='px-4 py-3 bg-white hover:bg-neutral-200 rounded-lg'
                    key={option.id} value={option.id}>{option.name}</li> )}
            </ul>
        </div>
    );
}