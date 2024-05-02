import {useTranslation} from "react-i18next";
import ProfileImage from '../Assets/stock_profile_image.jpg'
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import {useForm} from "react-hook-form";
import PersonalInfoForm from "./Update/PersonalInfoForm";
import PurposeForm from "./Update/PurposeForm";
import DietForm from "./Update/DietForm";
import AvoidingProductsForm from "./Update/AvoidingProductsForm";
import {api_PostUserUpdateInfo} from "../API/API";
import UpdatePersonalInfo from "./Update/UpdatePersonalInfo";
import EditIcon from '../Assets/icons/Edit_icon.svg';

export default function UpdateUserInfo() {
    const {t} = useTranslation();
    const {user, setUser} = useContext(UserContext)
    const [isEditPersonalInfoChecked, setIsEditPersonalInfoChecked] = useState(false);

    const {register, handleSubmit, watch, formState: {errors}, setError, setValue} = useForm({
        defaultValues: {
            userId: user.id,
            dietTypeId: user.dietTypeId,
            purposeType: user.purposeType,
            avoidingProductIds: user.avoidingProducts.map(product => product.id),
            generalPurposeTypeId: user.generalPurposeTypeId ? user.generalPurposeTypeId : 0,
            purposeWeight: user.purposeWeight,
            purposeWeightWeekly: user.purposeWeightWeekly,
            height: user.height,
            weight: user.weight,
            age: user.age,
            activityLevelId: user.activityLevelId,
            gender: user.gender,
            email: user.email,
            name: user.name,
            password: user.password
        }
    });

    async function UpdateUserInfo(data)
    {
        console.log(data)
        await api_PostUserUpdateInfo(data)
            .then((data) => {
                console.log(data)
                setUser(data)
                setValue('dietTypeId', data.dietTypeId);
                setValue('purposeType', data.purposeType);
                setValue('avoidingProductIds', data.avoidingProducts.map(product => product.id));
                setValue('generalPurposeTypeId', data.generalPurposeTypeId);
                setValue('purposeWeight', data.purposeWeight);
                setValue('purposeWeightWeekly', data.purposeWeightWeekly);
                setValue('height', data.height);
                setValue('weight', data.weight);
                setValue('age', data.age);
                setValue('activityLevelId', data.activityLevelId);
                setValue('gender', data.gender);
                setValue('email', data.email);
                setValue('name', data.name);
                setValue('password', data.password);
            })
    }

    return (
        <div className='px-48 pt-8 pb-32'>
            <div className='text-3xl mb-8'>{t("Profile")}</div>

            <div className='mb-6 flex gap-16'>
                <span className='relative'>
                    <img src={ProfileImage}
                         className={`w-32 h-32 object-cover rounded-full shadow border
                         ${isEditPersonalInfoChecked && 'opacity-60 cursor-pointer'}`}/>
                    {isEditPersonalInfoChecked &&
                        <img src={EditIcon} className='w-14 h-14 absolute right-0 bottom-0 cursor-pointer'/>}
                </span>
                <div className='flex flex-col gap-2 h-full justify-center'>
                    <span className='text-3xl cursor-pointer'>{user.name}</span>
                    <span className={`text cursor-pointer
                    ${isEditPersonalInfoChecked ? 'text-neutral-400' : 'text-blue-500 hover:underline'}`}
                    onClick={() => setIsEditPersonalInfoChecked(true)}>
                        {t('EditProfile')}</span>
                    <span className='text text-red-500 cursor-pointer hover:underline'>{t('SignOut')}</span>
                </div>
            </div>

            {!isEditPersonalInfoChecked &&
                <form className='flex flex-col gap-5 w-1/3'
                onSubmit={handleSubmit(UpdateUserInfo)}>
                    <DietForm watch={watch} setValue={setValue}/>
                    <AvoidingProductsForm watch={watch} setValue={setValue}/>
                    <PurposeForm register={register} watch={watch} setValue={setValue} errors={errors}/>
                    <PersonalInfoForm register={register} watch={watch} setValue={setValue} errors={errors}/>

                    <button className={`px-16 py-4 my-4 font-semibold text-white rounded-full bg-button-primary hover:bg-button-primary-hover w-full`}
                        type="submit" >
                        {t('Continue')}
                    </button>
                </form>
            }
            {isEditPersonalInfoChecked &&
                <form className='flex flex-col gap-5 w-1/3' onSubmit={handleSubmit(UpdateUserInfo)} autoComplete="new-password">
                    <UpdatePersonalInfo register={register} watch={watch} setValue={setValue} errors={errors} user={user}/>
                    <div className='flex flex-col gap-2'>
                        <button type="submit"
                            className={`px-16 py-4 font-semibold text-white rounded-full bg-button-primary hover:bg-button-primary-hover w-full`}>
                            {t('Continue')}
                        </button>
                        <button type="button" onClick={() => setIsEditPersonalInfoChecked(false)}
                            className={`w-full px-16 py-4 font-semibold text-button-primary rounded-full border border-button-primary hover:bg-neutral-200 `}>
                            {t('Cancel')}
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}