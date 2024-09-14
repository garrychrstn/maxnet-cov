import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useState } from 'react'

const LeafletMap = () => {
	const [ltd, setLtd] = useState();
    function GetLocComp() {
        console.log(('component trigerred'));
        
        const loc = useMapEvents({
            click() {
                loc.locate()
            },
            locationfound(e) {
				console.log(`found : ${e.latlng}`);
				
                setLtd(e.latlng);
				console.log(`set : ${ltd}`);
				
            }
        })
    }
    function returnLocComp() {
        return <GetLocComp />
    }
	let array_coordinate = [
		{ name : 'pos1', la: '-7.588965925268359', long: '110.78278201288234'},
		{ name : 'pos2', la: '-7.588473143069318', long: '110.78443027116379'},
		{ name : 'pos3', la: '-7.588488508198645', long: '110.78355135581893'},
	]
    return (
        <>
		<button className="bg-acce px-2 py-3 rounded-md text-txt text-md block m-auto mb-10" onClick={ () => { returnLocComp() }}>CHECK LOCATION</button>
		<small className='text-txt text-center'></small>
		<div id='map' className="m-auto w-4/5">
		  <MapContainer center={[-7.604425054489175, 110.81664186804254]} zoom={20} className='h-10'>
			<TileLayer
			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{ returnLocComp() }
			<Marker position={[-7.604425054489175, 110.81664186804254]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		  </MapContainer>
		</div>
        </>
     );
}
 
export default LeafletMap;