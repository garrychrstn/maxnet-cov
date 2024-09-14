import Nav from "./Components/Nav";
import Plan from "./Components/Plan";
import Leaflet from "./Leaflet";

const Home = ({ packet }) => {

    let needs = ['streaming video', 'games', 'tasks']
	
    return ( 
        <>
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
                <button className="bg-acce px-2 py-3 rounded-md text-txt text-md block m-auto mb-10">SHOW MAP</button>
                <Leaflet />
            </div>
            <div id="map" className="min-h-20"></div>
            <div className="footer min-h-5 mt-20 bg-prim p-10">
                <p className="text-center text-txt">Copyright by Maxnet+</p>
            </div>
        </>
     );
}
 
export default Home;