import { GeodesicLine } from "leaflet.geodesic";
import { MapContainer, TileLayer, Circle } from "react-leaflet";


const TryCircle = () => {
    const stra = L.latLng(-7.557622206326755, 110.84766584748613);
    const dest = L.latLng(-7.556899111392213, 110.84808097499894)
    console.log(stra.distanceTo(dest))
    console.log('hey');
    
    return ( 
        // -7.557622206326755, 110.84766584748613
        // -7.556899111392213, 110.84808097499894
        // 92m
        <>
        <div id='map' className="">
            <MapContainer center={[-7.604425054489175, 110.81664186804254]} zoom={16} className='h-10'>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle center={[-7.604425054489175, 110.81664186804254]} pathOptions={{ fillColor: 'blue' }} radius={200} />
                
            </MapContainer>
        </div>
        </>
     );
}
 
export default TryCircle;