const Plan = ({ packet }) => {
    function pickPacket() {
        
    }
    return ( 
        <div className="box bg-prim rounded-md p-8 m-4 shrink">
            <h1 className="font-bold xl:text-5xl sm:text-3xl">{ packet.speed } Mbps</h1>
            <small>cocok untuk x pengguna</small>
            <button onClick={ pickPacket(packet.price) } className="md:text-2xl sm:text-md p-2 bg-acce rounded-md mt-4 block">Rp. { packet.price }</button>

        </div>
     );
}
 
export default Plan;