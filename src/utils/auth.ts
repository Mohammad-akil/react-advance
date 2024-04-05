// utils/auth.js
import Cookies from "js-cookie";
// Function to log out the user
export const logout = () => {
  // Delete the user cookie
  Cookies.remove("user");
  localStorage.clear();
};

const  isValidJSON=(jsonString:any)=> {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check if a user is logged in
export const checkIsAuthenticated = () => {
  // Check if the user cookie exists
  const user = Cookies.get("user");
  if (user === undefined || user === "undefined") {
    return false;
  } else {
    return !!user;
  }
  // Return true if the user cookie exists, indicating the user is logged in
};

// Function return the user cookies detail
export const getUserDetail = () => {
  // Check if the user cookie exists
  const user = Cookies.get("user");
  if (user && user !== undefined && user !== "undefined" && isValidJSON(user)) {
    return JSON.parse(user);
  } else {
    return user;
  }
};

export const checkAuthUpdateCookie = () => {
  let authUpdate = Cookies.get("authUpdate");
  if (authUpdate) {
    return false;
  } else {
    // Set a cookie that expires after 30 minutes
    const expirationTimeInMinutes = 30;
    const expirationDate = new Date(
      new Date().getTime() + expirationTimeInMinutes * 60000
    ); // Convert minutes to milliseconds
    Cookies.set("authUpdate", localStorage.token, { expires: expirationDate });
    return true;
  }
};

export const isVisitedTimeGtTwoHrs=()=>{
  // Get the saved time from the cookie
const savedTime = Cookies.get('lastVisitTime');

if (savedTime) {
  const savedTimeDate:any = new Date(savedTime);
  const currentTime:any = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - savedTimeDate;

  // Convert milliseconds to hours
  const hoursDifference = timeDifference / (1000 * 60 *60);
  if (hoursDifference > 2) {
    const currentTime = new Date();
    Cookies.set('lastVisitTime', currentTime.toString());
   return true
  } else {
    return false;
  }
} else {
  const currentTime = new Date();
  Cookies.set('lastVisitTime', currentTime.toString());
  return true;
}
}