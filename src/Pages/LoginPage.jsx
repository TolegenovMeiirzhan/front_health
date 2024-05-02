import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Button from "../Components/Common/Button";
import {useContext, useEffect, useState} from "react";
import SignInWithAppleOrLogo from "../Components/Common/SignInWithAppleOrLogo";
import InputEmail from "../Components/Registration/InputEmail";
import {useForm} from "react-hook-form";
import InputPassword from "../Components/Registration/InputPassword";
import {api_PostUserLogin} from "../API/API";
import {UserContext} from "../App";
import {ErrorMessage} from "@hookform/error-message";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";

export default function LoginPage()
{
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const {register, handleSubmit, watch, formState: {errors}, setError, setValue} = useForm();
    const {setUser} = useContext(UserContext);

    const watchEmail = watch('email');
    const watchPassword = watch('password');

    useEffect(() => {
        if(watchEmail && watchPassword)
            setDisabled(false)
        else
            setDisabled(true)

        console.log(watchEmail)
        console.log(watchPassword)
    }, [watchEmail, watchPassword]);

    async function Login(data)
    {
        console.log(data);
        await api_PostUserLogin(data)
            .then(data => {
                setUser(data)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                if(err.response.status === 404)
                    setError('email', { type: 'custom', message: t('UserWithEmailNotFound') });
                if(err.response.status === 400)
                    setError('password', { type: 'custom', message: t('UserWrongPassword') });
            });
    }
    return (
        <div className='font-display'>
            <div className='flex flex-col mt-24 w-1/4 mx-auto'>
                <span className='text-4xl font-extrabold mb-4'>{t("SignInTitle")}</span>
                <span>
                    <span className='text-gray-600 font-light'>{t('DontHaveAnAccount')}  </span>
                    <span className='text-blue-500 cursor-pointer hover:underline'
                          onClick={() => navigate('/register')}>
                        {t('SignUp2')}
                    </span>
                </span>

                <form onSubmit={handleSubmit(Login)}
                    className='flex-col mt-8'>
                    <div className='mb-2'>
                        <InputEmail register={register} errors={errors}/>
                    </div>
                    <div className='mb-2'>
                        <InputPassword register={register} errors={errors}/>
                    </div>
                    <SignInWithAppleOrLogo/>

                    <div className='flex flex-col items-center z-0'>
                        <button disabled={disabled} type='submit'
                                className={`px-16 py-4 my-4 font-semibold text-white rounded-full bg-button-primary hover:bg-button-primary-hover disabled:bg-button-disabled
                                w-full`}>
                            {t('Continue')}
                        </button>
                        <span onClick={() => navigate('/')}
                              className='text-blue-500 hover:underline cursor-pointer'>{t('GoBack')}</span>
                    </div>
                </form>
            </div>
        </div>
    );
}