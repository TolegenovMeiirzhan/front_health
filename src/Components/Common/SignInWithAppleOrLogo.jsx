import AppleLogo from "../../Assets/icons/Apple_logo_white.svg";
import GoogleLogo from "../../Assets/icons/google_logo.svg";
import {useTranslation} from "react-i18next";

export default function SignInWithAppleOrLogo(props) {
    const {t} = useTranslation();

    return (
        <div className='my-8'>
            <div className="relative flex my-12 items-center">
                <div className="flex-grow border-t border-neutral-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">{t('OrSignInWith')}</span>
                <div className="flex-grow border-t border-neutral-400"></div>
            </div>
            <div className='mb-4'>
                <button
                    className='flex w-full justify-between items-center py-3 px-10 bg-black text-white rounded-xl'>
                    <img className='h-5' src={AppleLogo} alt={'apple logo'}/>
                    <span>{t('SignInWithApple')}</span>
                    <div></div>
                </button>
            </div>
            <div>
                <button
                    className='flex w-full justify-between items-center py-3 px-10 border border-black rounded-xl'>
                    <img className='h-5' src={GoogleLogo} alt={'google logo'}/>
                    <span>{t('SignInWithGoogle')}</span>
                    <div></div>
                </button>
            </div>
        </div>
    );
}