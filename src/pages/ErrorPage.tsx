

import { useRouteError } from "react-router-dom";
import Error404 from '../images/error/404.svg';

type RouteError = {
  statusText: string;
  message: string;
}

export default function ErrorPage()
{
  // const error = useRouteError() ;
  console.error("error Page _>");
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">


        <div className="hidden w-full xl:block ">
          <div className="  h-screen text-center   justify-center items-center ">
            <img className=" mx-auto max-h-96  " src={Error404} alt="Logo" />
            <h1 className="text-5xl      ">Oops!</h1>
            <p className="text-2xl  text-black    " >Aparentemente ha Ocurrido un Error Inesperado.</p>
            <p>
              {/* <i>{error.statusText || error.message}</i> */}
            </p>

          </div>
        </div>


      </div>
    </div>
  );
}