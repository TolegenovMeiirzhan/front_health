import {useTranslation} from "react-i18next";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {ErrorMessage} from "@hookform/error-message";

export default function InputNumber({step=1, placeholder, inputName, errors, register, watchValue})
{
    const {t} = useTranslation();
    return (
        <>
            <input
                {...register(inputName, {
                    required: t('FieldIsRequired'),
                    value: watchValue
                })}
                className='py-4 px-6 w-full text-zinc-800 placeholder-neutral-600 rounded-xl border border-neutral-300 bg-neutral-200 focus:bg-white focus:border-blue-500 focus:outline-none
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                type='number' step={step} placeholder={placeholder}/>

            <ErrorMessage errors={errors} name={inputName} render={({message}) =>
                <span className='flex mt-2 mb-1 text-red-500 items-center gap-2'>
                    <ExclamationTriangleIcon width='18' height='18'/>
                    <span>{message}</span>
                </span>}
            />
        </>
    );
}