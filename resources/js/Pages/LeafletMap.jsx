import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useState, useEffect } from 'react'
import osmAddress from '../osmAdress'

const LeafletMap = () => {
	const [leto, setleto] = useState([]);
	const [lat, setLat] = useState();
	const [fetchLocation, setFetchLocation] = useState(false);
	const [custInfo, setcustInfo] = useState({
		'packet' : 'undefined',
		'address' : undefined,
	})
	let map_hidden = 'hidden'
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
			setleto([e.latlng.lat, e.latlng.lng])
			console.log(`lat : ${leto[0]} & leto : ${leto[1]}`);
			map.flyTo(e.latlng, map.getZoom()); // Center the map on the location
		  });
		  setFetchLocation(false)
		}
	  
		return null;
	  }
	useEffect(() => {
        osmAddress.get('/reverse', {
            params: {
                format: 'jsonv2',
                lat: leto[0],
                lon: leto[1],
            }
        })
        // axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-7.557327198772382&lon=110.84773870390242')
        .then((response) => {
            console.log(response)
			setcustInfo({
				packet : '50 Mbps',
				address: `${response.data.address.village}, ${response.data.address.municipality}, ${response.data.address.city}, ${response.data.address.postcode}`
			})
			console.log(custInfo)
        })
    }, [leto])

	// API for get address by coordinates : 
	// https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-7.557327198772382&lon=110.84773870390242
    return (
        <>
		<button className="bg-acce px-2 py-3 rounded-md text-txt text-md block m-auto mb-10" onClick={handleLocationClick}>CHECK LOCATION</button>
		<small className='text-txt text-center'></small>
		<div className={ custInfo.address ? `checks text-txt md:flex sm:block justify-evenly items-center` : 'hidden'}>
			<div className="detail">
				<h1 className='text-2xl'>Your Request : </h1>
				<p>Your address : { custInfo.address ? custInfo.address : 'empty' }</p>
				<p>Packet : 50 Mbps</p>
				<p>Distance : 50 m</p>
				<p>Price : </p>
			</div>
			<div id='map' className="w-1/3 h-1/3">
			<MapContainer center={[-7.604425054489175, 110.81664186804254]} zoom={16} className='h-10'>
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
		</div>
        </>
     );
}
 
export default LeafletMap;