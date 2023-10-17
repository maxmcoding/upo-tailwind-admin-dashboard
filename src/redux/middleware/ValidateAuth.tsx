import { Session } from '../../redux/slices/account/session'
import { Outlet, Navigate } from 'react-router-dom';
import validateAuthFnc from '../../routes/validators/ValidateAuth'



////////////////////////////
////// This code receives a 'children' component and other props and checks if a session is valid to provide authentication.
////////////////////////////
export default function ValidateAuth(props : {SESSION: Session }) 
{
   const checks =  validateAuthFnc(props.SESSION)
  if ( !checks )
  {
    // console.log("ValidateAuth No hay session",props.SESSION)
    return (<Navigate to="/auth/signin" replace={true} />);
  }
//   console.log("ValidateAuth SI  hay session",)
  return (<Outlet />);
}