import { useContext, useEffect, useState } from "react";
import { offer_api} from "../../const";
import LocationContext from "../ContextAPi/Location"
const  useOfferData = ()=>{
    
    const [offerData,setOfferData]= useState(null);
    const {latitude,longitude,page} = useContext(LocationContext);
    const getData = async()=>{
        let URL = offer_api+`?latitude=${latitude}&longitude=${longitude}&page=${page}`;
        const data = await fetch(URL);
        const json = await data.json();
        setOfferData(json.data);
       };

    useEffect(()=>{getData();} ,[])

    return offerData;

}

export default useOfferData;