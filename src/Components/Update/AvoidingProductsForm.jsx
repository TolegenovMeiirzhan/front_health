import Dropdown from "../Common/Dropdown";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";
import {useTranslation} from "react-i18next";

export default function AvoidingProductsForm({watch, setValue}) {
    const {t} = useTranslation();
    const [productTypes, setProductTypes] = useState([]);
    const watchAvoidingProductIds = watch('avoidingProductIds');

    useEffect(() => {
        api_GetAll(Endpoints.getProductTypes)
            .then((data) => setProductTypes(data));
    }, []);

    useEffect(() => {
        console.log(watchAvoidingProductIds)
    }, [watchAvoidingProductIds]);

    return (
        productTypes.length > 0 &&
        <div>
            <p className='mb-3'>{t('ExcludedProducts')}</p>
            <Dropdown options={productTypes}
                      handleClick={(product) => {
                          if (!watchAvoidingProductIds.includes(product.id))
                              setValue('avoidingProductIds', [...watchAvoidingProductIds, product.id])
                      }
                      }
                      defaultName={t('ChooseFromList')}/>
            <div className='mt-2 flex flex-col gap-2'>
                {watchAvoidingProductIds.map(productId =>
                    <div key={productId}
                         className='pl-5 pr-6 py-2 flex text-neutral-700 justify-between border border-neutral-300 rounded-lg bg-neutral-100'>
                        <span>{productTypes.find(d => d.id === productId).name}</span>
                        <XMarkIcon className='w-6 h-6 cursor-pointer'
                           onClick={() => {
                               setValue('avoidingProductIds', watchAvoidingProductIds.filter((product_Id) => product_Id !== productId))
                           }}
                        />
                    </div>)}
            </div>
        </div>
    );
}