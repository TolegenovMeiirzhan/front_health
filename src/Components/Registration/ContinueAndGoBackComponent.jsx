import {useTranslation} from "react-i18next";
import Button from "../Common/Button";

export default function ContinueAndGoBackComponent({continueFunction, goBackFunction, disabled}) {
    const {t} = useTranslation();
    return (
        <div className='flex flex-col items-center z-0'>
            <Button onClick={continueFunction}
                    text={t('Continue')} isFullWidth={true} isDisabled={disabled}/>
            <span onClick={goBackFunction}
                  className='text-blue-500 hover:underline cursor-pointer'>{t('GoBack')}</span>
        </div>
    );
}