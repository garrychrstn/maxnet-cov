import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import axios from 'axios'

const LeafletMap = () => {
	const [ltd, setLtd] = useState();
	const [fetchLocation, setFetchLocation] = useState(false);
	let array_coordinate = [
		{ name : 'pos1', la: '-7.588965925268359', long: '110.78278201288234'},
		{ name : 'pos2', la: '-7.588473143069318', long: '110.78443027116379'},
		{ name : 'pos3', la: '-7.588488508198645', long: '110.78355135581893'},
	]
	const handleLocationClick = () => {
		setFetchLocation(true);
	  };
	function LocationMarker({ fetchLocation }) {
		const map = useMapEvents({});
	  
		if (fetchLocation) {
		  map.locate().on('locationfound', function (e) {
			console.log(`button : ${e.latlng}`); // Here you get the location coordinates
			map.flyTo(e.latlng, map.getZoom()); // Center the map on the location
		  });
		  setFetchLocation(false)
		}
	  
		return null;
	  }

	// API for get address by coordinates : 
	// https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-7.557327198772382&lon=110.84773870390242
    return (
        <>
		<button className="bg-acce px-2 py-3 rounded-md text-txt text-md block m-auto mb-10" onClick={handleLocationClick}>CHECK LOCATION</button>
		<small className='text-txt text-center'></small>
		<div id='map' className="m-auto w-4/5">
		  <MapContainer center={[-7.604425054489175, 110.81664186804254]} zoom={20} className='h-10'>
			<TileLayer
			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[-7.604425054489175, 110.81664186804254]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
			<LocationMarker fetchLocation={fetchLocation} />
		  </MapContainer>
		</div>
        </>
     );
}
 
export default LeafletMap;