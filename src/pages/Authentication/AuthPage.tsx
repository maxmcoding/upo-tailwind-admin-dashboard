import { Link } from 'react-router-dom';
import { useParams, Navigate, redirect } from 'react-router-dom';
import { useCallback, useEffect, useMemo, memo } from "react"
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import loginImg from '../../images/login/loginimg.svg';
import Loader from '../../common/Loader';
import config from '../../../config';
import axios from 'axios';

import type { RootState } from '../../redux/store'
import { useSelector, useDispatch, connect } from 'react-redux'
import { setTokens, Session } from '../../redux/slices/account/session'
import ValidateAuth from '../../routes/validators/ValidateAuth';


type TransitionToken = {
  code: string;
  // state?: string;
}




const AuthPage = (props: { SESSION: Session }) =>
{
  const dispatch = useDispatch()
  const params = useParams<TransitionToken>();
  const decodeTransitionToken = useMemo(() => decodeURI(params.code || ""), [params.code]);
  const session = useSelector((state: RootState) => state.session)



  console.warn("AuthPage Start", session);


  if (ValidateAuth( session ))
  {
    console.warn("AuthPage Ya Existe  hay session")
    return (<Navigate to="/" replace={true} />);
  }



  useEffect(() =>
  {
    // const transactionCode = Cookies.get(config.oauth.transition_token_coockies_name);
    console.warn("params", decodeTransitionToken);
    // const requestId = btoa(decodeTransitionToken + ":" + transactionCode);

    axios.post(`${config.oauth.token_url}`, { id: decodeTransitionToken })
      .then((response) =>
      {
        if (!response.data)
        {
          console.warn("error Tokens", response);
          window.location.replace(config.apps_client.main_webapp_url);
          return
        }
        const responseFormatted = JSON.parse(response.data) as Session;

        console.warn("response Tokens", responseFormatted);
        dispatch(setTokens({
          access_token: responseFormatted.access_token,
          id_token: responseFormatted.id_token,
          refresh_token: responseFormatted.refresh_token,
          token_type: responseFormatted.token_type,
          expires_in: responseFormatted.expires_in,
          expire_unix: Date.now() + (responseFormatted.expires_in * 1000)
        }))

        redirect("/profile")

      })
      .catch((err) =>
      {
        console.warn("error Tokens", err);
        window.location.replace(config.apps_client.main_webapp_url);
      });

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
                Estamos Cargando tus datos, por favor espera un momento, si no eres redirigido en 5 segundos, haz click en el boton de abajo.
                <button className="mb-1.5 block font-medium" onClick={() =>
                {
                  window.location.replace(config.apps_client.main_app_url);
                }} > Ir a Panel
                </button>
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
                console.log("redirect", config.apps_client.main_webapp_url)
                // redirect(config.apps_client.main_webapp_url)
                window.location.replace(config.apps_client.main_webapp_url);
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


function mapStateToProps(state: RootState)
{
  return {
    SESSION: state.session,
  }
}
export default connect(mapStateToProps, null)(AuthPage);
