import Logo from '../../Assets/Logo.svg'
import ProfileImage from '../../Assets/stock_profile_image.jpg'
import {BellIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../../App";

export default function Header({openProfilePage}) {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        console.log(user)
    }, [user]);

    function LogOut()
    {
        setUser(null)
        navigate('/welcome')
    }

    return (
        <div className='px-48 py-4 flex items-center justify-between border border-b-neutral-300'>
            <div>
                <img src={Logo} alt='logo'
                className='h-8 cursor-pointer'
                onClick={() => {
                    if(user)
                        navigate('/')
                    else
                        navigate('/welcome')
                }}/>
            </div>
            <div className='flex gap-2 items-center'>
                <BellIcon className='h-6 w-6 cursor-pointer'/>
                <div className="dropdown dropdown-end z-30">
                    <img tabIndex={0} role="button"
                        className='h-12 w-12  rounded-full object-cover border-4 border-gray-300 cursor-pointer hover:shadow'
                        src={ProfileImage} alt='profile_image'/>
                    <ul tabIndex={0}
                        className="w-36 dropdown-content relative z-30 menu p-2 cursor-pointer shadow border border-neutral-300 bg-white rounded-box">
                        <li onClick={openProfilePage}
                            className='px-2 py-2 bg-white hover:bg-neutral-200 rounded-lg'>
                            {t('Profile')}
                        </li>
                        <li onClick={() => LogOut()} className='px-2 py-2 bg-white hover:bg-neutral-200 rounded-lg'>
                            {t('SignOut')}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}