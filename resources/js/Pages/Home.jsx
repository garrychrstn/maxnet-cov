import Nav from "./Components/Nav";
import Plan from "./Components/Plan";
import LeafletMap from "./LeafletMap.jsx";
import { useMap, useMapEvents } from "react-leaflet";
import React, { useState } from "react";
export const RequestContext = React.createContext();

const Home = ({ packet }) => {
    const [custRequest, setCustRequest] = useState({
		packet : undefined,
		address : undefined,
		distance : undefined,
		initial_price : undefined,
		status : undefined
    })

    let needs = ['streaming video', 'games', 'tasks']
	
    const [ltd, setLtd] = useState(null);
    function GetLocComp() {
        console.log(('component trigerred'));
        
        const loc = useMapEvents({
            click() {
                loc.locate()
            },
            locationfound(e) {
                setLtd(e.latlng);
            }
        })
    }
    function getLoc() {
        // console.log('function is run');
        return <GetLocComp />
        
    }
    return ( 
        <>  
            <RequestContext.Provider value={[custRequest, setCustRequest]}>
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
                <div id="map" className="min-h-20"></div>
                <div className="footer min-h-5 mt-20 bg-prim p-10">
                    <p className="text-center text-txt">Copyright by Maxnet+</p>
                </div>
            </RequestContext.Provider>
        </>
     );
}
 
export default Home;