import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";
import Radio from "../Common/Radio";
import ContinueAndGoBackComponent from "./ContinueAndGoBackComponent";
import {RegistrationSteps} from "../../Pages/RegisterPage";

export default function DietInfoStep({setCurrentStepIndex, register, watch, setValue}) {
    const {t} = useTranslation();
    const [disabled, setDisabled] = useState(true);
    const [dietTypes, setDietTypes] = useState([]);

    const watchDietType = watch('dietTypeId');

    useEffect(() => {
        if(watchDietType)
            setDisabled(false)
        console.log(watchDietType)
    }, [watchDietType]);

    useEffect(() => {
        api_GetAll(Endpoints.getDietTypes)
            .then((data) => {
                console.log(data)
                setDietTypes(data)})
            .catch(err => console.log(err));
    }, []);

    async function Continue()
    {
        if(watchDietType)
        {
            setCurrentStepIndex(RegistrationSteps.AvoidingProductsInfo)
        }
    }

    return (
        <div className='flex-col'>
            <div className='mb-8'>
                <span className='text-3xl font-extrabold'>{t('RegistrationDietInfoTitle')}</span>
                <p className='text-neutral-500 mt-6'>{t('RegistrationDietInfoDescription')}</p>
            </div>

            <div className='flex flex-col mb-8'>
                {dietTypes.map(dietType =>
                    <Radio key={dietType.id}
                           value={dietType.id}
                           optionName={dietType.name}
                           optionDescription={dietType.description}
                           watchRadioValue={watchDietType}
                           register={register}
                           setValue={setValue}/>
                )}
            </div>

            <ContinueAndGoBackComponent disabled={disabled} continueFunction={Continue}
                goBackFunction={() => setCurrentStepIndex(RegistrationSteps.IdentityInfo)}/>
        </div>
    );
}