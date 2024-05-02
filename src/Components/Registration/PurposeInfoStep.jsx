import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";
import Switch from "../Common/Switch";
import Dropdown from "../Common/Dropdown";
import {RegistrationSteps} from "../../Pages/RegisterPage";
import ContinueAndGoBackComponent from "./ContinueAndGoBackComponent";
import InputNumber from "./InputNumber";

export default function PurposeInfoStep({setCurrentStepIndex, register, errors, watch, setValue}) {
    const {t} = useTranslation();
    const [disabled, setDisabled] = useState(true);
    const [generalPurposeTypes, setGeneralPurposeTypes] = useState([]);
    const [selectedGeneralPurposeType, setSelectedGeneralPurposeType] = useState(null);

    const watchPurposeType = watch('purposeType');
    const watchGeneralPurposeTypeId = watch('generalPurposeTypeId');
    const watchPurposeWeight = watch('purposeWeight');
    const watchPurposeWeightWeekly = watch('purposeWeightWeekly');

    useEffect(() => {
        console.log(watchPurposeWeight)
        console.log(watchPurposeWeightWeekly)
        /*if(watchPurposeType === 1 && watchPurposeWeight && watchPurposeWeightWeekly)
            setDisabled(false)*/
        if(watchPurposeType === 1 && watchPurposeWeight && watchPurposeWeightWeekly)
            setDisabled(false)
    }, [watchPurposeType, watchPurposeWeight, watchPurposeWeightWeekly]);

    useEffect(() => {
        console.log(watchPurposeType);
        if(watchPurposeType === 0 && watchGeneralPurposeTypeId)
            setDisabled(false)
    }, [watchPurposeType, watchGeneralPurposeTypeId]);

    useEffect(() => {
        api_GetAll(Endpoints.getGeneralPurposeTypes)
            .then((data) => setGeneralPurposeTypes(data))
            .catch((err) => console.log(err))
    }, []);

    return (
        <div className='flex-col'>
            <div className='mb-8'>
                <span className='text-3xl font-extrabold'>{t('RegistrationPurposeInfoTitle')}</span>
                <p className='text-neutral-500 mt-6'>{t('RegistrationPurposeInfoDescription')}</p>
            </div>

            <div className='flex flex-col mb-8'>
                <Switch firstValueName={t('GeneralPurpose')} secondValueName={t('ExactPurpose')}
                        isFirstValueChecked={watchPurposeType === 0}
                        toggleValue={() => setValue('purposeType',watchPurposeType === 0 ? 1 : 0)}/>

                {watchPurposeType === 0 &&
                    <div className='mt-8'>
                        <Dropdown defaultName={t('ChooseFromList')}
                          options={generalPurposeTypes}
                          handleClick={(purposeType) => {
                              setSelectedGeneralPurposeType(purposeType)
                              setValue('generalPurposeTypeId', purposeType.id);
                      }}/>
                    {selectedGeneralPurposeType &&
                        <div
                            className='py-3 px-6 mb-2 mt-4 flex justify-between text-neutral-600 bg-neutral-100 border border-neutral-300 rounded-xl'>
                            <span>{selectedGeneralPurposeType.name}</span>
                        </div>
                    }
                    </div>
                }
                {watchPurposeType === 1 &&
                    <div className='mt-8'>
                        <div className='mb-2'>
                            <InputNumber step={0.01} placeholder={t('PurposeWeightPlaceholder')} inputName={'purposeWeight'}
                             register={register} errors={errors} minValue={40}/>
                        </div>
                        <div className='mb-2'>
                            <InputNumber step={0.01} placeholder={t('PurposeWeightWeeklyPlaceholder')} inputName={'purposeWeightWeekly'}
                             register={register} errors={errors} minValue={0}/>
                        </div>
                    </div>
                }
            </div>

            <ContinueAndGoBackComponent disabled={disabled}
                continueFunction={() => setCurrentStepIndex(RegistrationSteps.PersonalInfo)}
                goBackFunction={() => setCurrentStepIndex(RegistrationSteps.AvoidingProductsInfo)}/>
        </div>
    );
}