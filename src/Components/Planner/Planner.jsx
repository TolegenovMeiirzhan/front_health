import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {
    api_AddMealToPlan,
    api_AddProductsToUser,
    api_DeleteMealFromPlan,
    api_GetAll,
    api_PostGenerateDayPlan
} from "../../API/API";
import Switch from "../Common/Switch";
import {UserContext} from "../../App";
import Calendar from "react-calendar";
import {ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ArrowLeftIcon, CalendarIcon, FunnelIcon, HeartIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";
import {Endpoints} from "../../Assets/values/endpoints";
import MealIcon from "../../Assets/icons/meal.png";
import {PieChart} from "react-minimal-pie-chart";
import type { PieChartProps } from 'react-minimal-pie-chart';
import {dateFormat} from '../../date.format';
import { Slider } from "antd";

const Colors = {
    Fats: '#5498FF',
    Carbohydrates: '#8952FF',
    Proteins: '#CE29E9'
}

const IngredientMetrics = {
    0: 'Milliliters',
    1: 'Grams',
    2: 'Pieces',
    3: 'Spoons'
}

export default function Planner() {
    const [isDayChecked, setIsDayChecked] = useState(true);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayPlan, setDayPlan] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSearching, setIsSearching] = useState(true);
    const [isCreatingManually, setIsCreatingManually] = useState(false);

    useEffect(() => {
        if(user === null) {
            navigate('/welcome')
            return;
        }
        console.log(selectedDate.toLocaleDateString());
        api_GetAll(`${Endpoints.getDayPlanForDate}?userId=${user.id}&date=${selectedDate.toLocaleDateString()}`)
            .then(data => {
                setDayPlan(data)
                setIsSearching(false)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                setIsSearching(false)
                if(err.response.status === 404) {
                    setDayPlan(null)
                }
            })
    }, [user, selectedDate]);

    useEffect(() => {
        console.log(dayPlan)
    }, [dayPlan]);

    async function GenerateDayPlan() {
        setIsGenerating(true);
        await api_PostGenerateDayPlan({userId: user.id, date: selectedDate.toISOString()})
        .then(data => {
            setDayPlan(data)
            setIsGenerating(false);
        })
        .catch(err => {
            setIsGenerating(false);
        })
    }

    return (
        <div>
            {/*PLANNER HEADER */}
            <div className='px-48 py-5 flex justify-between items-center border-b border-b-neutral-300'>
                <div className='w-1/6'>
                    <Switch toggleValue={() => setIsDayChecked(!isDayChecked)} isFirstValueChecked={isDayChecked}
                            firstValueName={t('Day')} secondValueName={t('Week')}/>
                </div>

                <div className='flex items-center gap-4'>
                    <ChevronLeftIcon className='w-8 h-8 cursor-pointer hover:-translate-x-2 transition-all'
                        onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 1 * 86400000))}/>

                    <div className="dropdown">
                        <div tabIndex={0} role="button"
                             className="px-6 py-4 flex w-56 gap-2 justify-center items-center bg-neutral-200 rounded-full hover:bg-neutral-300">
                            <span>
                                {selectedDate.format('mmmm d')}
                            </span>
                            <CalendarIcon className='w-6 h-6'/>
                        </div>
                        <div tabIndex={0} className="dropdown-content z-50 w-96 bg-white">
                            <Calendar onChange={(value) => setSelectedDate(value)} value={selectedDate}
                                      tileClassName={'calendarDayTile'}

                                      className='p-4 border border-neutral-300 shadow-lg rounded-xl' />
                        </div>
                    </div>

                    <ChevronRightIcon className='w-8 h-8 cursor-pointer hover:translate-x-2 transition-all'
                      onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 1 * 86400000))}/>
                </div>

                <div>
                    <button
                        type='button' className={`py-4 px-10 text-white rounded-full
                        ${dayPlan ? 'bg-button-primary hover:shadow-md' : 'bg-neutral-300'}`}>
                        {t('EditDay')}
                    </button>
                </div>
            </div>
            {/*PLANNER HEADER END*/}

            <div className='px-48 py-8'>
                {(!dayPlan && !isGenerating && !isSearching && !isCreatingManually)
                    ? <NoDayPlanComponent t={t} onGenerate={GenerateDayPlan} setCreating={setIsCreatingManually}/>
                    : <DayPlanComponent t={t} dayPlan={dayPlan} setDayPlan={setDayPlan}/>
                }
            </div>
        </div>
    );
}

function NoDayPlanComponent({t, onGenerate, setCreating}) {
    return (
        <div className='flex flex-col w-1/2'>
            <p className='text-4xl mb-4'>{t('NoPlanForDate')}</p>
            <p className='text-xl mb-10 text-neutral-600 font-display'>{t('NoPlanForDateDescription')}</p>
            <div className='flex gap-6'>
                <button
                    onClick={onGenerate}
                    className={'px-10 py-3 bg-button-primary hover:bg-button-primary-hover text-white text-lg rounded-full'}>
                    {t('Generate')}
                </button>
                <button
                    onClick={() => setCreating(true)}
                    className={'px-10 py-3 bg-white hover:bg-neutral-200 text-button-primary text-lg rounded-full border-2 border-button-primary'}>
                    {t('Manually')}
                </button>
            </div>
        </div>
    );
}

function DayPlanComponent({t, dayPlan, setDayPlan}) {
    const [openedMeal, setOpenedMeal] = useState(null);

    useEffect(() => {
        if (!dayPlan) {
            console.log('no day plan')
            setDayPlan({
                proteins: 0,
                carbohydrates: 0,
                fats: 0,
                mealPeriods: [
                    {mealPeriodName: 'Breakfast', meals: []},
                    {mealPeriodName: 'Brunch', meals: []},
                    {mealPeriodName: 'Lunch', meals: []},
                    {mealPeriodName: 'Dinner', meals: []}
                ]
            })
        } else
            console.log(dayPlan)
    }, [dayPlan]);

    async function RemoveMealFromPlan(mealId, periodId, dayPlanId) {
        console.log(mealId)
        console.log(periodId)
        console.log(dayPlanId)
        await api_DeleteMealFromPlan(mealId, periodId, dayPlanId)
            .then((data) => {
                console.log(data)
                setDayPlan(data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function AddMeal(mealId, periodId, dayPlanId) {
        console.log(`mealId: ${mealId}, periodId: ${periodId}, dayPlanId: ${dayPlanId}`);
        await api_AddMealToPlan({
            mealId: mealId,
            dayPlanId: dayPlanId,
            planMealCollectionId: periodId
        })
        .then((data) => {
          setDayPlan(data);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        dayPlan &&
        <>
            {openedMeal &&
                <div onClick={() => setOpenedMeal(null)}
                     className='mb-6 group flex gap-2 items-center text-blue-500 cursor-pointer'>
                    <ArrowLeftIcon className='w-5 h-5 group-hover:text-button-primary'/>
                    <span className='group-hover:text-button-primary text-lg'>{t('GoBack')}</span>
                </div>
            }
            <div className='flex gap-10'>
                <div className={`${!openedMeal ? 'w-[45%]' : 'w-[55%]'}`}>
                    {!openedMeal
                        ?
                        <DayPlanPeriodsComponent
                            t={t} dayPlan={dayPlan} setOpenedMeal={(meal) => setOpenedMeal(meal)}
                            removeMeal={(mealId, periodId, dayPlanId) => RemoveMealFromPlan(mealId, periodId, dayPlanId)}
                            addMeal={(mealId, periodId, dayPlanId) => AddMeal(mealId, periodId, dayPlanId)}/>
                        :
                        <MealInformation t={t} meal={openedMeal}/>
                    }
                </div>

                {/*ANALYTICS*/}
                <div className='grow flex flex-col gap-10'>
                    <span className='text-4xl'>{t('PCF_Analytics')}</span>

                    {!openedMeal ?
                        (dayPlan.fats > 0 && dayPlan.carbohydrates > 0 && dayPlan.proteins > 0) ?
                        <div className='w-80 h-80'>
                            <PieChartComponent data={[
                                {title: t('Proteins'), value: dayPlan.proteins, color: Colors.Proteins},
                                {title: t('Fats'), value: dayPlan.fats, color: Colors.Fats},
                                {title: t('Carbohydrates'), value: dayPlan.carbohydrates, color: Colors.Carbohydrates},
                            ]}/>
                        </div>
                        :
                        <div className='w-80 h-80 flex items-center justify-center rounded-full bg-neutral-200'>
                            <span className='w-1/3 text-xl text-center text-neutral-700'>
                                {t('AddMealFirst')}
                            </span>
                        </div>
                    :

                        <div className='w-80 h-80'>
                            <PieChartComponent data={[
                                {title: t('Proteins'), value: openedMeal.proteins, color: Colors.Proteins},
                                {title: t('Fats'), value: openedMeal.fats, color: Colors.Fats},
                                {title: t('Carbohydrates'), value: openedMeal.carbohydrates, color: Colors.Carbohydrates},
                            ]}/>
                        </div>
                    }
                    <div className='w-full'>
                        <div className='py-5 flex justify-evenly'>
                            <div className={`${!openedMeal ? 'w-1/3' : 'w-1/2'}`}></div>
                            <span className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} text-xl text-neutral-700`}>{t('All')}</span>
                            {!openedMeal && <span className='w-1/3 text-xl text-neutral-700'>{t('Purpose')}</span>}
                        </div>
                        <div className='w-full h-[0.1em] bg-neutral-200'></div>
                        <div className='py-5 flex justify-evenly'>
                            <span className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} text-xl text-neutral-700`}>{t('Calories')}</span>
                            <span className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} text-xl text-neutral-700`}>{openedMeal ? openedMeal.calories : dayPlan.calories}</span>
                            {!openedMeal && <span className='w-1/3 text-xl text-neutral-700'>2014</span>}
                        </div>
                        <div className='py-5 flex justify-evenly'>
                            <div className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} flex gap-3 items-center`}>
                                <span className={`w-3 h-3 bg-proteins rounded-full`}></span>
                                <span className='text-xl text-neutral-700'>{t('Proteins')}</span>
                            </div>
                            <span className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} text-xl text-neutral-700`}>{openedMeal ? openedMeal.proteins : dayPlan.proteins}</span>
                            {!openedMeal && <span className='w-1/3 text-xl text-neutral-700'>2014</span>}
                        </div>
                        <div className='py-5 flex justify-evenly'>
                            <div className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} flex gap-3 items-center`}>
                                <span className={`w-3 h-3 bg-fats rounded-full`}></span>
                                <span className='text-xl text-neutral-700'>{t('Fats')}</span>
                            </div>
                            <span className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} text-xl text-neutral-700`}>{openedMeal ? openedMeal.fats :dayPlan.fats}</span>
                            {!openedMeal && <span className='w-1/3 text-xl text-neutral-700'>2014</span>}
                        </div>
                        <div className='py-5 flex justify-evenly'>
                            <div className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} flex gap-3 items-center`}>
                                <span className={`w-3 h-3 bg-cabrohydrates rounded-full`}></span>
                                <span className='text-xl text-neutral-700'>{t('Carbohydrates')}</span>
                            </div>
                            <span className={`${!openedMeal ? 'w-1/3' : 'w-1/2'} text-xl text-neutral-700`}>{openedMeal ? openedMeal.carbohydrates : dayPlan.carbohydrates}</span>
                            {!openedMeal && <span className='w-1/3 text-xl text-neutral-700'>2014</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function PieChartComponent(props: PieChartProps) {
    const [focusedSegment, setFocusedSegment] = useState(null);

    useEffect(() => {

    }, [focusedSegment]);

    return (
        <PieChart
            viewBoxSize={[100, 100]}
            center={[50, 50]}
            radius={44}
            segmentsShift={(segmentIndex) => segmentIndex === focusedSegment ? 5 : 1}
            data={props.data}
            label={({dataEntry}) => `${dataEntry.title}\n${Math.round(dataEntry.percentage)}%`}
            labelStyle={{fontSize: '0.38em', fill: '#ffffff'}}
            onMouseOver={(_, segmentIndex) => {
                setFocusedSegment(segmentIndex)
            }}
            onMouseOut={() => {
                setFocusedSegment(undefined)
            }}
        />
    );
}

function DayPlanPeriodsComponent({t, dayPlan, setOpenedMeal, removeMeal, addMeal}) {
    function openMealPage(meal)
    {
        setOpenedMeal(meal);
    }
    function addMealToPlan(mealId, periodId)
    {
        addMeal(mealId, periodId, dayPlan.id)
    }
    function removeMealFromPlan(mealId, mealPeriodId)
    {
        console.log(mealId)
        console.log(mealPeriodId)
        console.log(dayPlan.id)
        removeMeal(mealId, mealPeriodId, dayPlan.id)
    }
    return (
        <>
            <div className='mb-8 flex justify-between items-end'>
                <div className='flex gap-4 items-end'>
                    <span className='text-4xl'>{t('Eating')}</span>
                    <span className='text-xl text-neutral-500'>{dayPlan.calories} {t('Calories')}</span>
                </div>
                <span className='p-1 rounded-full border-2 border-neutral-200 cursor-pointer'>
                        <EllipsisVerticalIcon className='w-6 h-6'/>
                    </span>
            </div>

            <div className='flex flex-col gap-4'>
                <MealPeriodComponent t={t} mealPeriod={dayPlan.mealPeriods[0]}
                    openMealPage={openMealPage} removeMeal={removeMealFromPlan} addMeal={addMealToPlan}/>
                <MealPeriodComponent t={t} mealPeriod={dayPlan.mealPeriods[1]}
                    openMealPage={openMealPage} removeMeal={removeMealFromPlan} addMeal={addMealToPlan}/>
                <MealPeriodComponent t={t} mealPeriod={dayPlan.mealPeriods[2]}
                    openMealPage={openMealPage} removeMeal={removeMealFromPlan} addMeal={addMealToPlan}/>
                <MealPeriodComponent t={t} mealPeriod={dayPlan.mealPeriods[3]}
                    openMealPage={openMealPage} removeMeal={removeMealFromPlan} addMeal={addMealToPlan}/>
            </div>
        </>
    );
}

function MealPeriodComponent({t, mealPeriod, openMealPage, removeMeal, addMeal}) {
    const [addingMeal, setAddingMeal] = useState(false);

    return (
        <div className={`py-6 px-8 border-2 border-neutral-200 rounded-lg
                ${addingMeal && 'overflow-y-hidden'}`}>
            <div className='flex mb-4 gap-4 items-end'>
                <span className='text-3xl text-neutral-900'>{t(mealPeriod.mealPeriodName)}</span>
                {mealPeriod.calories > 0 &&
                    <span className='text-xl text-neutral-500'>{mealPeriod.calories} {t('Calories')}</span>
                }
            </div>

            {mealPeriod.meals.map((meal, i) =>
                <MealListComponent meal={meal} key={i}
                   openMealPage={(meal) => openMealPage(meal)}
                   removeMealFromPlan={(mealId) => removeMeal(mealId, mealPeriod.id)}
                />
            )}

            <button
                onClick={() => setAddingMeal(true)}
                className='mt-4 px-10 py-3 border-2 border-add-meal rounded-full font-medium text-add-meal hover:bg-add-meal hover:text-white transition-all'>
                {t('AddMeal')}
            </button>

            {addingMeal && <AddMealModal setAddingMeal={setAddingMeal} t={t} addMeal={(mealId) => addMeal(mealId, mealPeriod.id)}/>}
        </div>
    );
}

function MealListComponent({meal, openMealPage, removeMealFromPlan}) {
    return (
        <div className='py-4 flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
                <input className='checkbox checkbox-md  '
                       type='checkbox' defaultChecked/>
                <span
                    onClick={() => openMealPage(meal)}
                    className={`w-24 h-24 border border-neutral-400 rounded-lg cursor-pointer hover:border-button-primary
                    ${meal.imageURL ? '' : 'p-3'}`}>
                    <img className={`${meal.imageURL && 'object-cover w-full h-full' }`}
                        src={meal.imageURL ? meal.imageURL : MealIcon}/>
                </span>
                <div className='flex flex-col gap-1'>
                    <span
                        onClick={() => openMealPage(meal)}
                        className='text-xl font-medium text-neutral-800 hover:text-button-primary cursor-pointer'>{meal.name}</span>
                    <span className='text text-neutral-500'>{meal.name}</span>
                </div>
            </div>
            <div onClick={() => removeMealFromPlan(meal.id)}
                className='group p-4 rounded-full border cursor-pointer hover:shadow border-neutral-300 hover:border-button-primary'>
                <XMarkIcon className='w-6 h-6 group-hover:text-button-primary'/>
            </div>
        </div>
    );
}

function MealInformation({t, meal}) {
    const {user} = useContext(UserContext);

    useEffect(() => {
        console.log(meal);
    }, [meal]);

    async function AddProductToUser()
    {
        await api_AddProductsToUser({
            userId: user.id,
            productIds: meal.ingredients.map(ingredient => ingredient.productId)
        })
            .then((data) => {
                console.log(data)
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='h-full flex flex-col gap-6'>
            <div>
                <span className='text-4xl'>{meal.name}</span>
            </div>
            <div className='h-full flex gap-6 border-r-2'>
                <div className='w-1/2 flex flex-col gap-4'>
                    <div className='w-full'>
                        <img className='w-full border border-neutral-400 rounded-xl'
                            src={meal.imageURL ? meal.imageURL : MealIcon}/>
                    </div>
                    <div
                        className='group py-4 px-6 flex gap-2 items-center cursor-pointer rounded-full border border-neutral-400 hover:border-button-primary'>
                        <HeartIcon className='w-6 h-6 group-hover:text-button-primary text-neutral-800'/>
                        <span className='group-hover:text-button-primary text-neutral-800'>{t('RecommendMore')}</span>
                    </div>
                    <div
                        onClick={AddProductToUser}
                        className='group py-4 px-6 flex gap-2 items-center cursor-pointer rounded-full border border-neutral-400 hover:border-button-primary'>
                        <ShoppingCartIcon className='w-6 h-6 group-hover:text-button-primary text-neutral-800'/>
                        <span className='group-hover:text-button-primary text-neutral-800'>{t('AddToProducts')}</span>
                    </div>
                    <div
                        className='group py-4 px-6 flex gap-2 items-center cursor-pointer rounded-full border border-neutral-400 hover:border-button-primary'>
                        <XMarkIcon className='w-6 h-6 group-hover:text-button-primary text-neutral-800'/>
                        <span className='group-hover:text-button-primary text-neutral-800'>{t('DontRecommend')}</span>
                    </div>
                </div>
                <div className='w-1/2 pr-6'>
                    <div className='mb-8'>
                        <p className='text-xl mb-4'>{t('Ingredients')}:</p>
                        <div className='flex flex-col gap-2'>
                            {meal.ingredients.map((ingredient, i) =>
                                <div key={i} className='flex gap-4'>
                                    <img className='w-16 h-16 border border-neutral-400 rounded-xl'
                                         src={ingredient.imageURL ? ingredient.imageURL : MealIcon } alt='ingredient icon'/>
                                    <div className='flex flex-col justify-center'>
                                        <span className='text-lg font-medium'>{ingredient.name}</span>
                                        <span className='text-neutral-500'>{ingredient.amount} {t(IngredientMetrics[ingredient.metricType])}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className='text-xl mb-4'>{t('Recipe')}:</p>
                        <p className='text-lg text-neutral-500'>{meal.recipe}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddMealModal({t, setAddingMeal, addMeal}) {
    const [isFilterOpened, setIsFilterOpened] = useState(false);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        api_GetAll(Endpoints.getAllMeals)
            .then((data) => {
                console.log(data)
                setMeals(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return (
        <div onClick={() => setAddingMeal(false)}
            className='fixed top-0 left-0 w-full h-full z-30 bg-black/75'>
            <div onClick={(e) => {e.stopPropagation()}}
                className='bg-white z-50 mx-auto my-96 w-96 rounded-xl'>
                <div className='p-4 flex items-center justify-between border-b border-neutral-400'>
                    <XMarkIcon onClick={() => setAddingMeal(false)}
                        className='w-6 h-6 cursor-pointer'/>
                    <span className='text-lg'>{t('AddMeal')}</span>
                    <div></div>
                </div>
                <div className='p-6 flex gap-4 border-b border-neutral-400'>
                    <input className={`grow py-2 px-4 border border-neutral-400 rounded-lg bg-neutral-100 placeholder-neutral-500
                        outline-none`}
                        type='text' placeholder={t('SearchMeals')}/>
                    <span
                        onClick={() => setIsFilterOpened(!isFilterOpened)}
                        className={`p-2 rounded-full border cursor-pointer 
                        ${isFilterOpened ? 'border-button-primary bg-button-primary' : 'border-neutral-500 bg-white'}`}>
                        <FunnelIcon
                            className={`w-6 h-6 
                            ${isFilterOpened ? 'text-white' : 'text-neutral-600'}`}/>
                    </span>
                </div>
                {!isFilterOpened ?
                    <div className='flex flex-col py-4 px-6'>
                        {meals.map((meal, i) =>
                            <div onClick={() => {
                                addMeal(meal.id)
                                setAddingMeal(false)
                            }}
                                 className={`py-1 flex gap-4 items-center cursor-pointer rounded-lg hover:bg-neutral-200`}
                                 key={i}>
                                <img src={meal.imageURL ? meal.imageURL : MealIcon} alt={'meal image'}
                                     className='w-12 h-12 border rounded-lg'/>
                                <span className='text-lg'>{meal.name}</span>
                            </div>
                        )}
                    </div>
                    :
                    <div className='flex flex-col'>
                        <div className='px-6 py-2'>
                            <div className='flex justify-between items-center'>
                                <span className='text-xl'>{t('Calories')}</span>
                                <div className='flex gap-2'>
                                    <input
                                        className='px-3 py-2 w-24 border border-neutral-400 outline-none bg-neutral-200 rounded-xl
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        type='number'/>
                                    <input
                                        className='px-3 py-2 w-24 border border-neutral-400 outline-none bg-neutral-200 rounded-xl
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        type='number'/>
                                </div>
                            </div>
                            <Slider range defaultValue={[20, 50]}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}