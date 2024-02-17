import {  useEffect, useState } from "react";


const  useGetDataByDishName = ()=>{
    
    const [dataByDishName,setDataByDishName]= useState(null);
    
    const getData = async()=>{
        let URL = "";
        const data = await fetch(URL);
        const json = await data.json();
        setDataByDishName(json.data);
       };

    useEffect(()=>{getData();} ,[])

    return dataByDishName;

}

export default useGetDataByDishName;