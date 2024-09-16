import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Circle, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useState, useEffect, useContext } from 'react'
import osmAddress from '../osmAdress'
import { RequestContext } from './Home'

const LeafletMap = () => {
	const [leto, setleto] = useState([]);
	const [fetchLocation, setFetchLocation] = useState(false);
	const [custRequest, setCustRequest] = useContext(RequestContext)
	let box_distributions = [
		{ name : 'pos1', la: '-7.588965925268359', long: '110.78278201288234'},
		{ name : 'pos2', la: '-7.588473143069318', long: '110.78443027116379'},
		{ name : 'pos3', la: '-7.588488508198645', long: '110.78355135581893'},
		{ name : 'custom', la: '-7.596832514567988', long : '110.82126175491112'}
	]
	function calcDistToBox(lati, long) { 
		let to = L.latLng(lati, long)
		let totalDist = []
		box_distributions.forEach(post => {
			let from = L.latLng(post.la, post.long)
			console.log(`${post.name} with ${to.distanceTo(from)}`);
			totalDist.push(to.distanceTo(from))
		});
		console.log(`shortest : ${Math.min.apply(null, totalDist).toFixed(2)}`);
		return Math.min.apply(null, totalDist).toFixed(2)
	}
	function calcPrice(dist) {
		let end_price
		if (custRequest.initial_price) {
			if (dist > 370) {
				return 'NOT AVAILABLE FOR THIS LOCATION'
			} else if (dist > 270) {
				end_price = custRequest.initial_price + ((dist - 270) * 2000)
			} else {
				end_price = custRequest.initial_price
			}
			return end_price
		} else {
			return 'choose packet'
		}
	}

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
	function statusCheck(dist) {
		if (dist > 370) {
			return false
		} else {
			return true
		}
	}
	useEffect(() => {
        osmAddress.get('/reverse', {
            params: {
                format: 'jsonv2',
                lat: leto[0],
                lon: leto[1],
            }
        })
        .then((response) => {
            console.log(response)
			setCustRequest((request) => ({
				...request,
				address: `${response.data.address.village}, ${response.data.address.municipality}, ${response.data.address.town}, ${response.data.address.city}, ${response.data.address.postcode}`,
				distance : calcDistToBox(leto[0], leto[1]),
				initial_price: calcPrice(calcDistToBox(leto[0], leto[1])),
				status: statusCheck(calcDistToBox(leto[0], leto[1]))
			}))
			console.log(custRequest)
        })
    }, [leto])

	// API for get address by coordinates : 
	// https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-7.557327198772382&lon=110.84773870390242
    return (
        <>
		<button className="bg-acce px-2 py-3 rounded-md text-txt text-md block m-auto mb-10" onClick={handleLocationClick}>CHECK LOCATION</button>
		<small className='text-txt text-center'></small>
		<div className={ custRequest.address ? `checks text-txt md:block sm:block` : 'hidden'}>
			<div className="detail">
				<h1 className='text-2xl'>Your Request : </h1>
				<p>Your address : { custRequest.address ? custRequest.address : 'empty' }</p>
				<p>Packet : { custRequest.packet ? `${custRequest.packet} Mbps`: `choose packet `}</p>
				<p>Estimated distance : { custRequest.distance ? `${custRequest.distance} m` : 'calculating...'}</p>
				<p>Estimated price : <span className={ custRequest.status ? `p-2 bg-green-500` : `p-2 bg-red-600`}>{ custRequest.initial_price ? `${custRequest.initial_price}`: `choose packet `}</span></p>
				<p>availability : <span className={ custRequest.status ? `p-2 bg-green-500` : `p-2 bg-red-600`}>{ custRequest.status ? 'AVAILABLE' : 'NOT AVAILABLE FOR THIS LOCATION'} </span></p>
			</div>
			<div id='map' className="">
			<MapContainer center={[-7.604425054489175, 110.81664186804254]} zoom={16} className='h-10'>
				<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/* LocationMarker will only ran when fetchLocation == true */}
				<LocationMarker fetchLocation={fetchLocation} />
			</MapContainer>
			</div>
		</div>
        </>
     );
}
 
export default LeafletMap;