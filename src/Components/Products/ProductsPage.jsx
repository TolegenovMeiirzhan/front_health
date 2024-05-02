import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../App";
import {useTranslation} from "react-i18next";
import {api_GetUserProducts} from "../../API/API";
import {XMarkIcon} from "@heroicons/react/24/solid";
import MealIcon from "../../Assets/icons/meal.png";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function ProductsPage()
{
    const {user} = useContext(UserContext)
    const {t} = useTranslation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api_GetUserProducts(user.id)
            .then((data) => {
                console.log(data)
                setProducts(data)
            })
    }, []);

    return (
        <div className='px-48 py-5'>
            <p className='text-4xl mt-10 mb-8'>{t('ProductsList')}</p>
            <div className='flex gap-12'>
                <div className='w-1/2'>
                    <div className='flex flex-col gap-2'>
                        {products.length > 0 ?
                            products.map((product, i) =>
                                <div className='px-6 py-4 flex items-center justify-between bg-neutral-100 rounded-xl'>
                                    <div className='flex gap-4 items-center'>
                                        <span
                                            className={`w-20 h-20 border border-neutral-400 rounded-lg cursor-pointer hover:border-button-primary
                                            ${product.imageURL ? '' : 'p-3'}`}>
                                            <img className={`${product.imageURL && 'object-cover w-full h-full'}`}
                                                src={product.imageURL ? product.imageURL : MealIcon}/>
                                        </span>
                                        <span
                                            className='text-xl font-medium text-neutral-800 hover:text-button-primary cursor-pointer'>
                                            {product.name}
                                        </span>
                                    </div>
                                    <div
                                         className='group p-4 rounded-full border cursor-pointer hover:shadow border-neutral-300 hover:border-button-primary'>
                                        <XMarkIcon className='w-6 h-6 group-hover:text-button-primary'/>
                                    </div>
                                </div>
                            )
                            :
                            <>
                                <p className='text-xl'>{t('UnfortunatelyNotFound')}</p>
                                <span>
                                    <span className='text-lg text-neutral-500'>{t('ProductsListAddProductsDescription')} </span>
                                    <span className='text-lg text-blue-500 hover:underline cursor-pointer'>{t('ProductsListSearchProducts')}</span>
                                </span>
                            </>
                            }
                    </div>
                </div>
                <div className='w-1/2'>
                    <p className='mb-8 text-2xl text-neutral-400'>{t('SupermarketsNearby')}</p>
                    <MapContainer center={[43.2380, 76.8829]} zoom={12} className='w-[56em] h-[56em]'
                                  style={{
                                      borderRadius: '1.2em',
                                      borderWidth: '0.1em',
                                      borderColor: '#aeaeae',
                                  }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* Additional map layers or components can be added here */}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}