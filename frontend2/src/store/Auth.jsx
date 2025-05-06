import { createContext , useContext , useState , useEffect} from "react";
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const[token , setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const[isLoading, setisLoading] = useState(true)
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const APIR = "https://baackend-frontend-admin-panel-1.onrender.com";



    
    const storeTokeninLS = (serverToken) =>{
      setToken(serverToken)
        return localStorage.setItem("token" , serverToken)
    }

    let isLoggedIn = !!token;
    console.log("islogged in " , isLoggedIn)

    const LogoutUser = () =>{
        setToken("");
        return localStorage.removeItem("token")
    }

//to get currently user logged in data;;
    const userAuthentication = async () => {
      if(!token) return;
        try {
          setisLoading(true);
         
          const response = await fetch(`${APIR}/api/auth/user`, {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            // our main goal is to get the user data 👇
            setUser(data.userData);
            // console.log(setUser);
            setisLoading(false);
          } else {
            console.error("Error fetching user data");
            setisLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      };


      const getServices = async () => {
        try {
          const response = await fetch(`${APIR}/api/data/service`, {
            method: "GET",
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data.msg);
            setServices(data.msg);
          }
        } catch (error) {
          console.log(`services frontend error: ${error}`);
        }
      };

      

      useEffect(() => {
        getServices();
        if(token){
           userAuthentication()
          };
       
      }, [token]);

    return(
        <AuthContext.Provider value= {{storeTokeninLS , LogoutUser ,isLoggedIn, user, services , authorizationToken , isLoading , APIR}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{

    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw new Error("useauth used outside of the provider")
    }
    return AuthContextValue;
}

