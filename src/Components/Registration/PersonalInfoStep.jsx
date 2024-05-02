import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Dropdown from "../Common/Dropdown";
import InputNumber from "./InputNumber";
import {RegistrationSteps} from "../../Pages/RegisterPage";
import ContinueAndGoBackComponent from "./ContinueAndGoBackComponent";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";
import Button from "../Common/Button";

export default function PersonalInfoStep({setCurrentStepIndex, register, errors, watch, setValue}) {
    const {t} = useTranslation();
    const [disabled, setDisabled] = useState(true);
    const [activityLevels, setActivityLevels] = useState([]);
    const genders =[
        {id: 1, name:'Мужчина'},
        {id: 2, name:'Женщина'},
        {id: 3, name:'Другое'},
    ]

    useEffect(() => {
        api_GetAll(Endpoints.getActivityLevels)
            .then(data => setActivityLevels(data))
            .catch((err) => console.log(err))
    }, []);

    const watchGender = watch('gender');
    const watchHeight = watch('height');
    const watchWeight = watch('weight');
    const watchAge = watch('age');
    const watchActivityLevelId = watch('activityLevelId');

    useEffect(() => {
        if(watchGender && watchHeight && watchWeight && watchAge && watchActivityLevelId)
        {
            setDisabled(false)
        }
    }, [watchGender, watchHeight, watchWeight, watchAge, watchActivityLevelId]);

    return (
        <div className='flex-col'>
            <div className='mb-8'>
                <span className='text-3xl font-extrabold'>{t('RegistrationPersonalInfoTitle')}</span>
                <p className='text-neutral-500 mt-6'>{t('RegistrationPersonalInfoDescription')}</p>
            </div>

            <div className='flex flex-col mb-8'>
                <div className='mb-2'>
                    <Dropdown defaultName={t('RegistrationGenderType')}
                              value={watchGender && genders.find(g => g.id === watchGender).name}
                              options={genders} handleClick={(gender) => setValue('gender', gender.id)}/>
                </div>
                <div className='mb-2'>
                    <InputNumber placeholder={t('RegistrationHeight')} register={register} errors={errors}
                                 inputName={'height'}/>
                </div>
                <div className='mb-2'>
                    <InputNumber placeholder={t('RegistrationWeight')} register={register} errors={errors} step={0.01}
                                 inputName={'weight'}/>
                </div>
                <div className='mb-2'>
                    <InputNumber placeholder={t('RegistrationAge')} register={register} errors={errors}
                                 inputName={'age'}/>
                </div>
                <div className='mb-2'>
                    <Dropdown defaultName={t('RegistrationActivityLevel')}
                              value={watchActivityLevelId && activityLevels.find(a => a.id === watchActivityLevelId).name}
                              options={activityLevels}
                              handleClick={(activityLevel) => setValue('activityLevelId', activityLevel.id)}/>
                </div>
            </div>
            <div className='flex flex-col items-center z-0'>
                <button disabled={disabled} type="submit"
                        className={`px-16 py-4 my-4 font-semibold text-white rounded-full bg-button-primary hover:bg-button-primary-hover disabled:bg-button-disabled w-full`}>
                    {t('Continue')}
                </button>
                <span onClick={() => setCurrentStepIndex(RegistrationSteps.PurposeInfo)}
                      className='text-blue-500 hover:underline cursor-pointer'>{t('GoBack')}</span>
            </div>
        </div>
    );
}