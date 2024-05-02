import Switch from "../Common/Switch";
import Dropdown from "../Common/Dropdown";
import InputNumber from "../Registration/InputNumber";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";

export default function PurposeForm({register, setValue, watch, errors}) {
    const {t} = useTranslation();
    const [generalPurposeTypes, setGeneralPurposeTypes] = useState([]);

    const watchPurposeType = watch('purposeType')
    const watchGeneralPurposeTypeId = watch('generalPurposeTypeId')

    useEffect(() => {
        api_GetAll(Endpoints.getGeneralPurposeTypes)
            .then((data) => setGeneralPurposeTypes(data));
    }, []);

    useEffect(() => {
        console.log(`general purpose type id: ${watchGeneralPurposeTypeId}`)
    }, [watchGeneralPurposeTypeId]);

    return (
        <div>
            <p className='mb-3'>{t('Purpose')}</p>
            <Switch firstValueName={t('GeneralPurpose')} secondValueName={t('ExactPurpose')}
                    isFirstValueChecked={watchPurposeType === 0}
                    toggleValue={() => setValue('purposeType', watchPurposeType === 0 ? 1 : 0)}/>
            {watchPurposeType === 0 && generalPurposeTypes.length > 0 &&
                <div className='mt-8'>
                    <Dropdown defaultName={t('ChooseFromList')}
                              options={generalPurposeTypes}
                              value={generalPurposeTypes.find(d => d.id === watchGeneralPurposeTypeId).name}
                              handleClick={(purposeType) => {
                                  setValue('generalPurposeTypeId', purposeType.id);
                              }}/>
                </div>
            }
            {watchPurposeType === 1 &&
                <div className='mt-8'>
                    <div className='mb-2'>
                        <InputNumber step={0.01} placeholder={t('PurposeWeightPlaceholder')}
                             inputName={'purposeWeight'}
                             register={register} errors={errors} minValue={40}/>
                    </div>
                    <div className='mb-2'>
                        <InputNumber step={0.01} placeholder={t('PurposeWeightWeeklyPlaceholder')}
                             inputName={'purposeWeightWeekly'}
                             register={register} errors={errors} minValue={0}/>
                    </div>
                </div>
            }
        </div>
    );
}