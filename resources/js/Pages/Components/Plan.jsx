import { useContext } from "react";
import { RequestContext } from "../Home";

const Plan = ({ packet }) => {
    const [custRequest, setCustRequest] = useContext(RequestContext)
    function choosePacket(price, speed) {
        setCustRequest((request) => ({
            ...request,
            packet: speed,
            initial_price: price
        }))
        console.log(`packet : ${speed} Mbps at Rp ${price} / month`)
    }
    return ( 
        <div className="box bg-prim rounded-md p-8 m-4 shrink">
            <h1 className="font-bold xl:text-5xl sm:text-3xl">{ packet.speed } Mbps</h1>
            <small>cocok untuk x pengguna</small>
            <button onClick={ () => {choosePacket(packet.price, packet.speed)} } className="md:text-2xl sm:text-md p-2 bg-acce rounded-md mt-4 block m-auto">Rp. { packet.price }</button>
        </div>
     );
}
 
export default Plan;