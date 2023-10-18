import { Session } from '../../redux/slices/account/session'
import { Outlet, Navigate } from 'react-router-dom';
import validateAuthFnc from '../../routes/validators/ValidateAuth'
import type { RootState } from '../../redux/store'
import { useSelector, useDispatch, connect } from 'react-redux'


////////////////////////////
////// This code receives a 'children' component and other props and checks if a session is valid to provide authentication.
////////////////////////////
function ValidateAuth(props : {SESSION: Session }) 
{
  // const session = useSelector((state: RootState) => state.session)
  console.log("ValidateAuth MID Start", props);

   const checks =  validateAuthFnc(props.SESSION)
  if ( !checks )
  {
    console.warn("ValidateAuth MID ERROR session",props.SESSION)
    return (<Navigate to="/auth/signin" replace={true} />);
  }
  console.log("ValidateAuth MID OK",)
  return (<Outlet />);
}


function mapStateToProps(state: RootState)
{
  return {
    SESSION: state.session,
  }
}
export default connect(mapStateToProps, null)(ValidateAuth);