import Dropdown from "../Common/Dropdown";
import InputNumber from "../Registration/InputNumber";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";

export default function PersonalInfoForm({register, errors, watch, setValue}) {
    const {t} = useTranslation();
    const [activityLevels, setActivityLevels] = useState([]);
    const genders =[
        {id: 1, name:'Мужчина'},
        {id: 2, name:'Женщина'},
        {id: 3, name:'Другое'},
    ]

    const watchGender = watch('gender');
    const watchHeight = watch('height');
    const watchWeight = watch('weight');
    const watchAge = watch('age');
    const watchActivityLevelId = watch('activityLevelId');

    useEffect(() => {
        api_GetAll(Endpoints.getActivityLevels)
            .then(data => setActivityLevels(data))
            .catch((err) => console.log(err))
    }, []);

    return (
        <div>
            <p className='mb-3'>{t('GeneralInfo')}</p>
            <div className='mb-2'>
                <Dropdown
                  value={watchGender && genders.find(g => g.id === watchGender).name}
                  options={genders} handleClick={(gender) => setValue('gender', gender.id)}/>
            </div>
            <div className='mb-2'>
                <InputNumber placeholder={t('RegistrationHeight')} register={register} errors={errors}
                     inputName={'height'}/>
            </div>
            <div className='mb-2'>
                <InputNumber placeholder={t('RegistrationWeight')} register={register} errors={errors}
                             step={0.01} inputName={'weight'}/>
            </div>
            <div className='mb-2'>
                <InputNumber placeholder={t('RegistrationAge')} register={register} errors={errors}
                             inputName={'age'}/>
            </div>

            {activityLevels.length > 0 &&
            <div className='mb-2'>
                <Dropdown defaultName={t('RegistrationActivityLevel')}
                          value={activityLevels.find(a => a.id === watchActivityLevelId).name}
                          options={activityLevels}
                          handleClick={(activityLevel) => setValue('activityLevelId', activityLevel.id)}/>
            </div>
            }
        </div>
    );
}