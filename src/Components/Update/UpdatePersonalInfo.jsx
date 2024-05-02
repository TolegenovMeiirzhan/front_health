import InputText from "../Registration/InputText";
import {useTranslation} from "react-i18next";
import InputEmail from "../Registration/InputEmail";

export default function UpdatePersonalInfo({register, errors, user, watch}) {
    const {t} = useTranslation();
    const watchName = watch('name')

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <p className='mb-4'>{t('Name')}</p>
                <InputText register={register} errors={errors} inputName={'name'} inputPlaceholder={user.name}/>
            </div>
            <div>
                <p className='mb-4'>{t('Email')}</p>
                <InputEmail register={register} errors={errors}/>
            </div>
            <div>
                <p className='mb-4'>{t('Password')}</p>
                <input autoComplete="new-password"
                    className='mb-2 py-4 px-6 w-full text-zinc-800 placeholder-neutral-600 rounded-xl border border-neutral-300 bg-neutral-200 focus:bg-white focus:border-blue-500 focus:outline-none'
                    type='password' placeholder={t('OldPassword')} name={'oldPassword'}/>
                <input autoComplete="new-password"
                    {...register("password")}
                    className='mb-2 py-4 px-6 w-full text-zinc-800 placeholder-neutral-600 rounded-xl border border-neutral-300 bg-neutral-200 focus:bg-white focus:border-blue-500 focus:outline-none'
                    type='password' placeholder={t('NewPassword')} name={'newPassword'}/>
                <input autoComplete="new-password"
                    className='mb-2 py-4 px-6 w-full text-zinc-800 placeholder-neutral-600 rounded-xl border border-neutral-300 bg-neutral-200 focus:bg-white focus:border-blue-500 focus:outline-none'
                    type='password' placeholder={t('RepeatNewPassword')} name={'repeatNewPassword'}/>
            </div>
        </div>
    );
}