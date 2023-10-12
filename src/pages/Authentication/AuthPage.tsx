import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from "react"
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import loginImg from '../../images/login/loginimg.svg';
import Loader from '../../common/Loader';
import config from '../../../config';
import axios from 'axios';
import Cookies from 'js-cookie'

type TransitionToken = {
  code: string;
  // state?: string;
}

const AuthPage = () =>
{
  const params = useParams<TransitionToken>();

  const handleSubmit = useEffect(() =>
  {

    const TransitionToken = Cookies.get(config.oauth.transition_token_coockies_name);

    console.warn("params", params, TransitionToken, config.oauth.transition_token_coockies_name);

    const requestId = btoa(params.code + ":" + TransitionToken);

    axios.get(`${config.oauth.token_url}`, { data: { id: requestId } })
      .then((res) =>
      {
        console.warn("response Tokens", res);
        // window.location.href = config.apps_client.main_webapp_url;
      })

  }, []);



  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>

              <span className="mt-15 inline-block">
                <img style={{ width: "350px", height: "350px", fill: "none" }} src={loginImg} alt="StartedImg" />

              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <button className="mb-1.5 block font-medium" onClick={() =>
              {
                // window.location.href = config.apps_client.main_webapp_url
              }} > &#60; Back </button>

              <Loader />


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
