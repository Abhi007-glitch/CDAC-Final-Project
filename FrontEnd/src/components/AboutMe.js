const AboutMe = () => {
  return (
    <div className="container mx-auto flex px-5 py-12 sm:flex-row flex-col items-center">
      <div className="lg:flex-col md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Hi, I am Abhinav.
        </h1>
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Chef of this Application
        </h1>
        <p className="mb-8 leading-relaxed">
          I have built this scalable and performant yummy Application using
          ingredient like React, Redux, React Router Dom, Tailwind CSS and is
          powered by by Swiggy’s Live API.
        </p>
        <p className="mb-8 leading-relaxed">
          {" "}
          Application is baked using Parcel and served via Babel.{" "}
        </p>
        <p className="mb-8 leading-relaxed">
          {" "}
          Various flavours like Config Driven UI, infinite scroll ,Progressive
          Web App(PWA),lazy loading, custom Hook, debouncing, etc can be found
          in the Application.
        </p>
        <p className="mb-8 leading-relaxed">
          For delivering food powered by Swiggy’s Live API a CORS Proxy Server
          is build to serve in Production, due to which application might be
          seems to be little slow.
        </p>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-1/2">
        <img
          className="object-cover object-center rounded"
          alt="hero"
          src="https://res.cloudinary.com/dwy8lddht/image/upload/v1688025218/portfolio_2_zsotwn.jpg"
        />
      </div>
    </div>
  );
};

export default AboutMe;

// (<div className="flex w-screen justify-center items-center ">
//      <div className="w-1/3">
//        <div className="flex-col ">
//            <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight text-primary"> About Chef</h1>

//            <h3> Hi, I am Abhinav, Chef of this Application.
//               <p>I love to play with Tools like Javascript, React, Redux, HTML, CSS and many more.</p>
//                <p>I have built this scalable and performan yummy Application using ingredient like React, Redux, React Router Dom, Tailwind CSS and is powered by by Swiggy’s Live API.</p>
//                Food is baked using Parcel and served via Babel.
//                Various flavours like Config Driven UI, infinite scroll ,Progressive Web App(PWA),lazy loading, custom Hook, debouncing, etc can be found in the Application.
//                For delivering food powered by Swiggy’s Live API a CORS Proxy Server is build to serve  in Production.
//          </h3>
//        </div>

//      </div>
//      <div className="w-1/3 h-1/3  flex items-center justify-center">
//         <img src="https://res.cloudinary.com/dwy8lddht/image/upload/v1688025218/portfolio_2_zsotwn.jpg" className="rounded-xl object-cover"/>
//      </div>
//    </div>)
