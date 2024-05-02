import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";
import Dropdown from "../Common/Dropdown";
import {XMarkIcon} from "@heroicons/react/24/solid";
import ContinueAndGoBackComponent from "./ContinueAndGoBackComponent";
import {RegistrationSteps} from "../../Pages/RegisterPage";

export default function AvoidingProductsStep({setCurrentStepIndex, register, watch, setValue}) {
    const {t} = useTranslation();
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductTypes, setSelectedProductTypes] = useState([]);

    const watchAvoidingProductIds = watch('avoidingProductIds');

    useEffect(() => {
        console.log(watchAvoidingProductIds)
    }, [watchAvoidingProductIds]);

    useEffect(() => {
        api_GetAll(Endpoints.getProductTypes)
            .then((data) => {
                setProductTypes(data)})
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='flex-col'>
            <div className='mb-8'>
                <span className='text-3xl font-extrabold'>{t('RegistrationAvoidingProductsInfoTitle')}</span>
                <p className='text-neutral-500 mt-6'>{t('RegistrationAvoidingProductsInfoDescription')}</p>
            </div>

            <div className='flex flex-col mb-8 gap-4'>
                <Dropdown
                    defaultName={t('ChooseFromList')}
                    options={productTypes}
                    handleClick={(productType) => {
                        if(!selectedProductTypes.includes(productType))
                        {
                            setSelectedProductTypes([...selectedProductTypes, productType]);
                            setValue('avoidingProductIds', [...watchAvoidingProductIds, productType.id])
                        }
                    }}/>

                <div className='flex-col'>
                    {selectedProductTypes.map((value, index) =>
                        <div key={index}
                             className='py-3 px-6 mb-2 flex justify-between text-neutral-600 bg-neutral-100 border border-neutral-300 rounded-xl'>
                            <span>{value.name}</span>
                            <XMarkIcon className='w-6 h-6 cursor-pointer'
                                       onClick={() => {
                                           setSelectedProductTypes(selectedProductTypes.filter((product) => product.id != value.id))
                                           setValue('avoidingProductIds', watchAvoidingProductIds.filter((productId) => productId !== value.id))
                                       }}
                            />
                        </div>)}
                </div>
            </div>

            <ContinueAndGoBackComponent continueFunction={() => setCurrentStepIndex(RegistrationSteps.PurposeInfo)}
                                        goBackFunction={() => setCurrentStepIndex(RegistrationSteps.DietInfo)} disabled={false}/>
        </div>
    );
}