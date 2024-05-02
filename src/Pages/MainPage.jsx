import React, {useContext, useEffect, useState} from "react";
import Header from "../Components/Common/Header";
import SecondHeader from "../Components/Common/SecondHeader";
import Planner from "../Components/Planner/Planner";
import UpdateUserInfo from "../Components/UpdateUserInfo";
import {UserContext} from "../App";
import {useNavigate} from "react-router-dom";
import ProductsPage from "../Components/Products/ProductsPage";

export default function MainPage()
{
    const [sectionId, setSectionId] = useState(0);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null)
        {
            navigate('/welcome')
            console.log('user is null')
        }
        console.log(user)
    }, [user]);

    return (
        <div>
            <Header openProfilePage={() => setSectionId(2)} />
            <SecondHeader sectionId={sectionId} setSectionId={setSectionId}/>

            {sectionId === 0 &&
                <Planner/>}

            {sectionId === 1 &&
                <ProductsPage/>}

            {sectionId === 2 &&
                <UpdateUserInfo/>}
        </div>
    );
}