import './App.css';
import RouterConfig from './router/routerConfig';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { register } from "./services/api/api"
import { useCallback, useEffect } from "react"

function App() {
  const queryClient = new QueryClient();
  const [ cookies , setCookie ] = useCookies(["authToken"]);

  //We are registering a user according to browser session
  const getToken = useCallback(async () => {     
    try {          
      const tokenResp = await register().catch(e => {console.log(e);});
      // console.log(tokenResp)
      if(!tokenResp){
        throw new Error("")
      }
      if(tokenResp?.token){
        setCookie("authToken", tokenResp.token)
      }
      
    } catch (error) {
        console.error("Registration error:", error);
        throw error; // Throw to trigger `toast.promise` error state
    }
  }, [setCookie]);

  useEffect(()=>{
    if(!cookies?.authToken){
      toast.promise(
        getToken(),
         {
           loading: 'Registering...',
           success: <b>Welcome (Registered)!</b>,
           error: <b>Failed to Register.</b>,
         }
       );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  

  return (
    <QueryClientProvider client={queryClient}>
          <RouterConfig />
          <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
