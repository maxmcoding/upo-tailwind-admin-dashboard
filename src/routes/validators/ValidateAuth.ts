// import type { RootState } from './redux/store'
import { Session } from '../../redux/slices/account/session'
import { useSelector, useDispatch, connect } from 'react-redux'


export default  function ValidateAuth(SESSION: Session ) 
{
  // console.log("ProvideAuth Check", props.SESSION    )
  // return (<></>)
  // const session = useSelector((state: RootState) => state.session)
  const session = SESSION
  const currentTime = session.expire_unix < Date.now() ;
  if ( currentTime )
  {
    console.warn("ValidateAuth fnc ERROR "  , SESSION )
    return false
  }
  // console.log("ValidateAuth fnc OK"   )
  return true
}
