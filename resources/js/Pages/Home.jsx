import Nav from "./Components/Nav";
import Plan from "./Components/Plan";

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
            <h1 className="text-center text-2xl text-txt mb-8 ">Our Home Services</h1>
            <div className="plan w-3/5 m-auto flex justify-center flex-wrap text-txt text-center">
                { packet.detail.map((p) => (
                    <Plan packet={ p } key={ p.speed }/>
                ))}
            </div>
        </>
     );
}
 
export default Home;