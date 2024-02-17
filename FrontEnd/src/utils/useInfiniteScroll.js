

import React,{useEffect, useState} from 'react'

const  useInfiniteScroll= ()=>{
   
    
    const handleInfiniteScroll = async ()=>{
        try{
         
          if (window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight)
          {
           setPage((prev)=>prev+1);
          }
  
        }catch(error)
        {
          console.log(error);
        }
       };

       useEffect( ()=>{
        document.addEventListener("scroll",handleInfiniteScroll);
  
        return ()=>{ document.removeEventListener("scroll",handleInfiniteScroll);}
      },[]);


}

export default useInfiniteScroll