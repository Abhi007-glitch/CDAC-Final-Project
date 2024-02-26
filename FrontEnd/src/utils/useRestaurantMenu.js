/**
 * *************************creating a custom Hook *************************************
 * *** This hook will have it's own reconcillation process.
 * 
 * 
 */

import { useState,useEffect, useContext } from "react";
import { swiggy_menu_api_URL } from "../../const";
import LocationContext from "../ContextAPi/Location";
import axios from "./axios";


const useRestaurantMenu = (urlId)=>{

    //creating state 
    const [restaurant,setRestaurant]= useState(null);
    const {latitude,longitude}= useContext(LocationContext);

     const getRestaurantMenu = async()=>{
        const URL = `/item/allitems/${urlId}`;
        let json;
     
       json = await axios.get(
       URL
      );
      console.log("Menu data--->");
       console.log(json.data);
       
        console.log("Menu Data ", json);
        setRestaurant(json.data);
    }

    useEffect(()=>{
        getRestaurantMenu();
    },[]); 
    
    return restaurant;// returning a state value 

}


export default useRestaurantMenu;
