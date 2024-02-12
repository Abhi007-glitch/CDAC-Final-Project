const MenuCard = ({ name, price, description, cloudinaryImageId, isVeg }) => {
  // return (<div className=" w-1/2 flex p-4 m-2 drop-shadow-lg  justify-between border rounded-xl border-gray-200  focus-within:shadow-lgcard  bg-base-100 ">
  //   <div>

  //    {(isVeg===1)?(<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoD0qDX71-VNZ40ujnq2m290VG6uauj21spw&usqp=CAU" className="w-4 h-4object-cover"></img>):(<img src="https://www.pngkit.com/png/full/257-2579552_non-veg-symbol-non-veg-symbol-png.png" className="w-4 h-4"></img>)}

  //   <h1 className="font-bold ">{name}</h1>
  //    <p className="text-stone-400"> Rs. {price/100}</p>
  //    <p className="text-stone-400 py-3">{description}</p>
  //   </div>
  //   <div className=" lg:w-64 lg:h-44 md:w-52 md:h-40 sm:w-40 sm:h-28">
  //     <img className="  object-contain h-full w-fulla" src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/"+cloudinaryImageId} />
  //   </div>
  // </div>);

  return (
    <div className="  w-full  py-4 m-2 drop-shadow-lg transition border rounded-xl border-gray-200  focus-within:shadow-lg  duration-700 ease-in-out transform hover:-translate-y-1">
      <div className="flex justify-center items-center  py-2  w-full shrink-0">
        <div className="justify-self-start w-9/12 shrink-0">
          {isVeg === 1 ? (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoD0qDX71-VNZ40ujnq2m290VG6uauj21spw&usqp=CAU"
              className="w-4 h-4object-cover"
            ></img>
          ) : (
            <img
              src="https://www.pngkit.com/png/full/257-2579552_non-veg-symbol-non-veg-symbol-png.png"
              className="w-4 h-4"
            ></img>
          )}

          <h1 className="font-bold ">{name}</h1>
          <p className="text-stone-400"> Rs. {price / 100}</p>
          <p className="text-stone-400 py-3">{description}</p>
        </div>
        <div className=" w-3/12 justify-self-end  lg:w-64 lg:h-44 md:w-52 md:h-40 sm:w-40 sm:h-30 ">
          <img
            className="  object-contain h-full w-full"
            src={
              "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/" +
              cloudinaryImageId
            }
          />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="grid grid-cols-2">
  //   <div className="col-span-1 w-7/10">
  //    <p>"Frist"</p>
  //   </div>
  //   <div className="col-span-2 w-3/10">
  //    <p>"Second"</p>
  //   </div>
  // </div>
  // )
};

export default MenuCard;
