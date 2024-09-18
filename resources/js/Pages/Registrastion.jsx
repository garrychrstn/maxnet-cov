import { useContext } from "react";
import { RequestContext } from "./Home";

const Registrasion = () => {
    const [custRequest, setCustRequest] = useContext(RequestContext);

    return ( 
        <>
            <h1>Registration</h1>
        </>
     );
}
 
export default Registrasion;