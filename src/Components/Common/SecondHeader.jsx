import {useTranslation} from "react-i18next";

export default function SecondHeader({sectionId, setSectionId}) {
    const {t} = useTranslation();
    return (
        <div className='px-48 flex items-center border-b border-neutral-300 gap-4'>
            <div onClick={() => setSectionId(0)}
                className={`py-4 cursor-pointer
                ${sectionId === 0 ? 'border-b border-button-primary text-button-primary' : 'text-neutral-500'}`}>
                <span>{t('Planner')}</span>
            </div>
            <div onClick={() => setSectionId(1)}
                className={`py-4 cursor-pointer
                ${sectionId === 1 ? 'border-b border-button-primary text-button-primary' : 'text-neutral-500'}`}>
                <span>{t('Products')}</span>
            </div>
        </div>
    );
}