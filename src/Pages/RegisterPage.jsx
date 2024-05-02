import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Stepper from "../Components/Registration/Stepper";
import {useForm} from "react-hook-form";
import IdentityInfoStep from "../Components/Registration/IdentityInfoStep";
import DietInfoStep from "../Components/Registration/DietInfoStep";
import AvoidingProductsStep from "../Components/Registration/AvoidingProductsInfoStep";
import PurposeInfoStep from "../Components/Registration/PurposeInfoStep";
import PersonalInfoStep from "../Components/Registration/PersonalInfoStep";
import {api_PostUserRegistration} from "../API/API";
import {UserContext} from "../App";

export const RegistrationSteps = {
    IdentityInfo: 0,
    DietInfo: 1,
    AvoidingProductsInfo: 2,
    PurposeInfo: 3,
    PersonalInfo: 4,
    FinishRegistration: 5,
}

export default function RegisterPage()
{
    const navigate = useNavigate();
    const [currentStepIndex, setCurrentStepIndex] = useState(RegistrationSteps.IdentityInfo);
    const {register, handleSubmit, watch, formState: {errors}, setError, setValue} = useForm({
        defaultValues: {
            dietTypeId: 1,
            purposeType: 0,
            avoidingProductIds: [],
        }
    });
    const {setUser} = useContext(UserContext);

    async function setCurrentStep(nextCurrentStep)
    {
        console.log(nextCurrentStep)
        switch (true)
        {
            case (nextCurrentStep < 0):
                console.log('less')
                navigate('/welcome')
                break;
            default:
                setCurrentStepIndex(nextCurrentStep);
                break;
        }
    }

    async function onSubmit(values) {
        console.log(values)
        await api_PostUserRegistration(values)
            .then((data) => {
                setUser(data)
                navigate('/')
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='font-display'>
            <div className='flex flex-col mt-24 w-1/4 mx-auto'>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {currentStepIndex > RegistrationSteps.IdentityInfo &&
                        <Stepper currentStepIndex={currentStepIndex} numberOfSteps={4}/>}

                    {currentStepIndex === RegistrationSteps.IdentityInfo &&
                        <IdentityInfoStep setCurrentStepIndex={setCurrentStep} register={register} watch={watch} errors={errors} setError={setError}/>}
                    {currentStepIndex === RegistrationSteps.DietInfo &&
                        <DietInfoStep setCurrentStepIndex={setCurrentStep} register={register} watch={watch} setValue={setValue}/>}
                    {currentStepIndex === RegistrationSteps.AvoidingProductsInfo &&
                        <AvoidingProductsStep setCurrentStepIndex={setCurrentStep} register={register} watch={watch} setValue={setValue}/>}
                    {currentStepIndex === RegistrationSteps.PurposeInfo &&
                        <PurposeInfoStep setCurrentStepIndex={setCurrentStep} register={register} errors={errors} watch={watch} setValue={setValue}/>}
                    {currentStepIndex === RegistrationSteps.PersonalInfo &&
                        <PersonalInfoStep setCurrentStepIndex={setCurrentStep} register={register} errors={errors} watch={watch} setValue={setValue}/>}
                </form>
            </div>
        </div>
    );
}