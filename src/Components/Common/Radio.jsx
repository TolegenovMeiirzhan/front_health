import {useTranslation} from "react-i18next";

export default function Radio({value, optionName, optionDescription, register, watchRadioValue, setValue})
{
    const {t} = useTranslation();
    return (
        <div
            /*onClick={() => setValue('dietTypeId', value)}*/
            className={`flex group items-start gap-2 mb-2 p-4 w-full rounded-xl cursor-pointer border
        bg-neutral-100
        ${watchRadioValue == value ? 'border-blue-500' : 'border-neutral-400 hover:border-neutral-500'}`}>
            <span className='p-1'>
                <input
                    {...register("dietTypeId",
                    {required: t('FieldIsRequired')})}
                    checked={watchRadioValue == value}
                    className='cursor-pointer w-5 h-5 ring-neutral-200'
                    type='radio' value={value}/>
            </span>
            <div className='flex flex-col'>
                <span className='font-bold text-lg'>{optionName}</span>
                <span className='text-neutral-500'>{optionDescription}</span>
            </div>
        </div>
    );
}