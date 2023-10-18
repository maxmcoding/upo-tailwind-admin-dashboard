
/// ///////////////////////////////////////
// generate random text for identification
/// ////////////////////////////////////////
const makeid =  (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

/// ///////////////////////////////////////
// generate sha256 hash of a string
/// ////////////////////////////////////////
async function sha256(message : string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  // console.log( "sha256 Result = ",hashHex , " Lenght", hashHex.length );
  return hashHex;
}


 
 
export default {
    makeid,
    sha256
}