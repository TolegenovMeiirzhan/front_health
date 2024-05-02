import ImageSvg from '../Assets/welcome-page-illustration.svg'
import LogoGray from '../Assets/Logo-gray.svg'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Button from "../Components/Common/Button";

export default function WelcomePage() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    function NavigateToRegistration()
    {
        navigate("/register")
    }

    function NavigateToLogin()
    {
        navigate("/login")
    }

    return (
        <div className='font-display'>
            <div className='flex flex-col mt-24 mb-32 w-1/3 mx-auto items-center'>
                <img className='w-2/4 mb-6' src={ImageSvg} alt={'Welcome page illustration'}/>
                <span className='mb-4 text-lg font-bold'>{t('WelcomeTitle')}</span>
                <p className='text-center mb-8 px-16'>{t('WelcomeText')}</p>
                <Button text={t('SignUp')} onClick={NavigateToRegistration}/>
                <span>
                    <span className='text-gray-600 font-light'>{t('AlreadyHaveAnAccount')}  </span>
                    <span className='text-blue-500 cursor-pointer hover:underline' onClick={NavigateToLogin}>{t('SignIn')}</span>
                </span>

            </div>
            <div className='flex flex-col items-center text-gray-400 text-xs'>
                <img className='w-24 mb-4' src={LogoGray} alt={'Logo gray'}/>
                <span>2024</span>
                <span>{t('AllRightsReserved')}</span>
            </div>
        </div>
    );
}