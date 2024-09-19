import Nav from "./Components/Nav";
import Plan from "./Components/Plan";
import LeafletMap from "./LeafletMap.jsx";
import { useMap, useMapEvents } from "react-leaflet";
import React, { useState } from "react";
import Registration from "./Registration.jsx";
export const RequestContext = React.createContext();
export const LetoContext = React.createContext();

const Home = ({ packet }) => {
    const [custRequest, setCustRequest] = useState({
		packet : undefined,
		address : undefined,
		distance : undefined,
		initial_price : undefined,
		status : undefined
    })
    const [leto, setLeto] = useState([]);

    let needs = ['streaming video', 'games', 'tasks']
	
    function ShowRegis() {
        // console.log('function is run');
        if (custRequest.status == true) {
            return <Registration />
        } else {

        }
    }
    return ( 
        <>  
            <RequestContext.Provider value={[custRequest, setCustRequest]}>
                <LetoContext.Provider value={[leto, setLeto]}>
                    <Nav />
                    <div className="hero text-center mt-10 text-5xl text-txt mb-12">
                        <h1 className='font-extrabold py-2'><span className='text-acce'>Affordable</span>, <span className='text-acce'>Highspeed</span> Broadband</h1>
                        <h1 className='font-extrabold py-2'><span className='text-acce'>WiFi</span> Services</h1>
                        <h1 className='font-extrabold py-2'>For Your Needs</h1>
                    </div>
                    <h1 className="text-center text-2xl text-txt mb-8">Our Home Services</h1>
                    <div className="plan md:w-3/5 sm:w-full m-auto flex justify-center flex-wrap text-txt text-center">
                        { packet.detail.map((p) => (
                            <Plan packet={ p } key={ p.speed }/>
                        ))}
                    </div>
                    <div className="tool-cov w-3/4 mx-auto mt-20">
                        <h1 className="text-txt text-2xl m-auto text-center mb-7">Check our availability</h1>
                        <LeafletMap />
                    </div>
                    { console.log(`status : ${custRequest.status}`) }
                    { ShowRegis() }
                    {/* <Registration className={ custRequest.status ? `block m-auto w-4/5` : `hidden`}/> */}
                    <div className="footer min-h-5 mt-20 bg-prim p-10">
                        <p className="text-center text-txt">Copyright by Maxnet+</p>
                    </div>
                </LetoContext.Provider>
            </RequestContext.Provider>
        </>
     );
}
 
export default Home;