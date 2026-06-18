import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{

 const {
   isAuthenticated,
   loading
 } = useAuth();


 if(loading){
   return <h2>Loading...</h2>;
 }


 if(!isAuthenticated){
   return <Navigate to="/login" />;
 }


 return children;

}


export default ProtectedRoute;