import { useState } from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";

const AccordianComponent = ({data,type})=>{

    const [visible, setVisible] = useState(true);
    if (data==null)
    {
        return;
    }
    console.log("From accordian")
    console.log(data);
return (
<div className="flex flex-col w-full justify-start items-start">
    
    <div className="flex flex-wrap w-full justify-around">
        <h1 className="from-bold text-xl">{type}</h1>
        <button onClick={()=>{setVisible((visible===true)?(false):true)}}  className="font-bold  mx-6 px-5 text-2xl">^</button>

        
    </div>


    {/* conditional rendering */}
    {/* Accordian */}
    {(visible===true )?
    (<div className="flex flex-col justify-center items-center w-full   ">
{   
    (data).map((item)=>{
        
return <>
   <MenuCard key={item?.itemId} id={item?.id} isVeg={item?.isVeg} name={item?.itemName} price={item?.itemPrice} description={item?.itemDescription} cloudinaryImageId={"e33e1d3ba7d6b2bb0d45e1001b731fcf"}/> 

            </>
        })
}
    </div>):<></>}

<div className=" h-5 w-full bg-zinc-200 my-8"> 
</div>
  
</div>
);
}

export default  AccordianComponent;