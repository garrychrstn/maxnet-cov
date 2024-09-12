const Plan = ({ packet }) => {
    console.log('from Plan comp')
    console.log(packet)
    return ( 
        <div className="box bg-prim rounded-md p-8 m-4">
            <h1 className="font-bold text-5xl">{ packet.speed } Mbps</h1>
            <small>cocok untuk x pengguna</small>
            <h2 className="text-2xl p-2 bg-acce rounded-md mt-4">Rp. { packet.price }</h2>

        </div>
     );
}
 
export default Plan;