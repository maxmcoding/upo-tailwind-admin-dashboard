import { Link } from 'react-router-dom';
import { useParams, Navigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, memo } from "react"
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import loginImg from '../../images/login/loginimg.svg';
import Loader from '../../common/Loader';
import config from '../../../config';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux'
import { setTokens, Session } from '../../redux/slices/account/session'

type TransitionToken = {
  code: string;
  // state?: string;
}




const AuthPage = () =>
{
  const dispatch = useDispatch()
  const params = useParams<TransitionToken>();
  const decodeTransitionToken = useMemo(() => decodeURI(params.code || ""), [params.code]);
  console.warn("AuthPage Start", decodeTransitionToken);

  useEffect(() =>
  {
    // const transactionCode = Cookies.get(config.oauth.transition_token_coockies_name);
    console.warn("params", decodeTransitionToken);
    // const requestId = btoa(decodeTransitionToken + ":" + transactionCode);

    axios.post<Session>(`${config.oauth.token_url}`, { id: decodeTransitionToken })
      .then((res) =>
      {
        console.warn("response Tokens", res);
        dispatch(setTokens({
          access_token: res.data.access_token,
          id_token: res.data.id_token,
          refresh_token: res.data.refresh_token,
          token_type: res.data.token_type,
          expires_in: res.data.expires_in,
          expire_unix: Date.now() + res.data.expires_in
        }))

      })
      .catch((err) =>
      {
        console.warn("error Tokens", err);
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

export default memo(AuthPage);
