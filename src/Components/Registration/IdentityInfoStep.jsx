import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {api_GetUserByEmail} from "../../API/API";
import InputText from "./InputText";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";
import InputConfirmPassword from "./InputConfirmPassword";
import {ErrorMessage} from "@hookform/error-message";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import SignInWithAppleOrLogo from "../Common/SignInWithAppleOrLogo";
import ContinueAndGoBackComponent from "./ContinueAndGoBackComponent";
import {RegistrationSteps} from "../../Pages/RegisterPage";

export default function IdentityInfoStep({setCurrentStepIndex, register, watch, errors, setError}) {
    const {t} = useTranslation();
    const [disabled, setDisabled] = useState(true);

    const watchEmail = watch('email');
    const watchPassword = watch('password');
    const watchConfirmPassword = watch('confirmPassword');
    const watchName = watch('name');

    useEffect(() => {
        if((watchName && watchEmail && watchEmail && watchConfirmPassword)
            && (watchPassword === watchConfirmPassword))
            setDisabled(false)
        else
            setDisabled(true);
    }, [watchEmail, watchPassword, watchConfirmPassword, watchName]);

    async function Continue()
    {
        await api_GetUserByEmail(watchEmail)
            .then((data) => {
                setError('identityError', t('UserWithEmailAlreadyRegistered'))
                setDisabled(true)
            })
            .catch((err) => {

            })
        if(!disabled)
            setCurrentStepIndex(RegistrationSteps.DietInfo)
    }

    return (
        <div className='flex-col'>
            <div className='mb-8'>
                <span className='text-3xl font-extrabold'>{t("SignUpTitle")}</span>
                <p className='text-neutral-500 mt-6'>{t('SignUpDescription')}</p>
            </div>

            <div>
                <div className='mb-2'>
                    <InputText register={register} errors={errors} inputName={'name'} inputPlaceholder={t('Name')}/>
                </div>
                <div className='mb-2'>
                    <InputEmail register={register} errors={errors}/>
                </div>
                <div className='mb-2'>
                    <InputPassword register={register} errors={errors}/>
                </div>

                <div className='mb-2'>
                    <InputConfirmPassword register={register} errors={errors} watchPassword={watchPassword} setError={setError}/>
                </div>
            </div>

            <ErrorMessage errors={errors} name="identityError" render={({message}) =>
                message && <span className='flex mt-2 mb-1 text-red-500 items-center gap-2'>
                    <ExclamationTriangleIcon width='20' height='20'/>
                    <span>{message}</span>
                </span>}
            />
            <SignInWithAppleOrLogo/>

            <ContinueAndGoBackComponent continueFunction={Continue} disabled={disabled} goBackFunction={() => setCurrentStepIndex(-1)}/>
        </div>
    );
}