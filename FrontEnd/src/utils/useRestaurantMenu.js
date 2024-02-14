/**
 * *************************creating a custom Hook *************************************
 * *** This hook will have it's own reconcillation process.
 * 
 * 
 */

import { useState,useEffect, useContext } from "react";
import { swiggy_menu_api_URL } from "../../const";
import LocationContext from "../ContextAPi/Location";


const useRestaurantMenu = (urlId)=>{

    //creating state 
    const [restaurant,setRestaurant]= useState(null);
    const {latitude,longitude}= useContext(LocationContext);

     const getRestaurantMenu = async()=>{
        const URL = swiggy_menu_api_URL+`?menuId=${urlId}&latitude=${latitude}&longitude=${longitude}`;
        const data = await fetch(URL);
        const json = await data.json();
       
        console.log("Menu Data ", json);
        setRestaurant(json.data);
    }

    useEffect(()=>{
        getRestaurantMenu();
    },[]); 
    
    return restaurant;// returning a state value 

}


export default useRestaurantMenu;
