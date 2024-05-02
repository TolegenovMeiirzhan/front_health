import {ErrorMessage} from "@hookform/error-message";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";

export default function InputConfirmPassword({register, errors, watchPassword, setError}) {
    const {t} = useTranslation();

    return (
        <>
            <input
                {...register("confirmPassword", {
                    required: t('FieldIsRequired'),
                    validate: {
                        equalsToPassword: p => p === watchPassword || t('PasswordsDoNotMatch'),
                    }
                })}
               className='py-4 px-6 w-full text-zinc-800 placeholder-neutral-600 rounded-xl border border-neutral-300 bg-neutral-200 focus:bg-white focus:border-blue-500 focus:outline-none'
               type='password' placeholder={t('RepeatPassword')}
            />

            <ErrorMessage errors={errors} name="confirmPassword" render={({message}) =>
                message && <span className='flex mt-2 mb-1 text-red-500 items-center gap-2'>
                    <ExclamationTriangleIcon width='20' height='20'/>
                    <span>{message}</span>
                </span>}
            />
        </>
    );
}