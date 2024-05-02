import Dropdown from "../Common/Dropdown";
import {useEffect, useState} from "react";
import {api_GetAll} from "../../API/API";
import {Endpoints} from "../../Assets/values/endpoints";
import {useTranslation} from "react-i18next";

export default function DietForm({setValue, watch}) {
    const [dietTypes, setDietTypes] = useState([]);
    const {t} = useTranslation();
    const watchDietType = watch('dietTypeId')

    useEffect(() => {
        api_GetAll(Endpoints.getDietTypes)
            .then((data) => {
                setDietTypes(data)
                console.log(data)
            });
    }, []);

    return (
        dietTypes.length > 0 && <div>
            <p className='mb-3'>{t('Diet')}</p>
            <Dropdown options={dietTypes}
                      handleClick={(dietType) => setValue('dietTypeId', dietType.id)}
                      value={dietTypes.find(d => d.id === watchDietType).name}
                      defaultName={'dietTypeId'}/>
        </div>
    );
}