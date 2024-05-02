import {ErrorMessage} from "@hookform/error-message";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";

export default function InputPassword({register, errors})
{
    const {t} = useTranslation();

    return (
        <>
            <input
                {...register("password", {required: t('FieldIsRequired')})}
                className='py-4 px-6 w-full text-zinc-800 placeholder-neutral-600 rounded-xl border border-neutral-300 bg-neutral-200 focus:bg-white focus:border-blue-500 focus:outline-none'
                type='password' placeholder={t('EnterPassword')}/>
            <ErrorMessage errors={errors} name="password" render={({message}) =>
                <span className='flex mt-2 mb-1 text-red-500 items-center gap-2'>
                    <ExclamationTriangleIcon width='18' height='18'/>
                    <span>{message}</span>
                </span>}/>
        </>
    );
}