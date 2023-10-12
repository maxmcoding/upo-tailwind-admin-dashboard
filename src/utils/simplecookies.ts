import jscookie from 'js-cookie'



// generate function tha will save a cookie if not exist
const setCookieifNotExists = (cname, cvalue, exdays) =>
{
    const currentCookies = jscookie.get(cname)
    console.log("currentCookies", currentCookies)

    if (!currentCookies) {
        // retornar valor Nuevo
        const setCookies = jscookie.set(cname, cvalue , { expires: 1/12, domain: '*.upo.cl' ,  path: '' })
        console.log("currentCookies Set New ", setCookies)
        return cvalue
    }
    // retornar valor actual
    return currentCookies
}












export default {
    setCookieifNotExists
}