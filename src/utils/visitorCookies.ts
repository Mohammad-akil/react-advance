import Cookies from 'js-cookie';
export const getCookie=(cookie_name:any)=> {
    let name = cookie_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  export const checkVisitorCount=(cookie_name:any)=> {
    let cookie = getCookie(cookie_name);
    if (cookie == "") {
      let cookie_expiration = 365;
      const d = new Date();
      d.setTime(d.getTime() + cookie_expiration * 24 * 60 * 60 * 1000);
      let expires = ";expires=" + d.toUTCString();
      let expiresValue = d.toUTCString();
      document.cookie =`${cookie_name}=1^${cookie_expiration}^${expiresValue};${cookie_expiration};path=/${expires}`
    }else{
       let newCount=Number(cookie.split("^")[0] || 0)
        newCount=newCount+1;
        let expires  = ";expires=" + cookie.split("^")[2];
        let expiresValue = cookie.split("^")[2];
        let cookie_expiration =  cookie.split("^")[1];
        document.cookie =`${cookie_name}=${newCount}^${cookie_expiration}^${expiresValue};${cookie_expiration};path=/${expires}`
    }
    return Number(getCookie(cookie_name).split("^")[0] || 0);
  }
  export const visitorCount=(cookie_name:any)=>{
    let cookie = getCookie(cookie_name);
    return Number(cookie.split("^")[0] || 0);
  }

  export const setUserCookie=(data:any)=>{
    let expires = "expires=Fri, 31 Dec 9999 21:10:10 GMT";
    document.cookie =`authDetail=${JSON.stringify(data)};${expires};`
  }

  export const eraseCookie=(name:any)=> {   
    if(name==="visitor_count"){
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
    }else{
      document.cookie = name+'=; Max-Age=-99999999;';  
    }
}

export const getDismissCount=()=>{
  let count = Cookies.get('dismissCount');
   if(count){
    return Number(count)+1
   }else{
    return 1
   }
}

export const  setDismissCount=()=>{
  let count =getDismissCount()
  if(count>0){
    Cookies.set('dismissCount', `${count+1}`, { expires: 365 });
  }else{
    Cookies.set('dismissCount', "1", { expires: 365 });
  }

}