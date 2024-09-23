import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Circle, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useState, useEffect, useContext } from 'react'
import osmAddress from '../osmAdress'
import { RequestContext, LetoContext } from './Home'

const LeafletMap = ({ sites }) => {
	const [leto, setLeto] = useContext(LetoContext);
	const [fetchLocation, setFetchLocation] = useState(false);
	const [custRequest, setCustRequest] = useContext(RequestContext)
	let box_distributions = [
		{ name : 'pos1', la: '-7.588965925268359', long: '110.78278201288234'},
		{ name : 'pos2', la: '-7.588473143069318', long: '110.78443027116379'},
		{ name : 'pos3', la: '-7.588488508198645', long: '110.78355135581893'},
		{ name : 'custom', la: '-7.596832514567988', long : '110.82126175491112'},
		{ name : 'customsoba', la: '-7.5716', long : '110.8226'},
	]

	console.log(`sites : ${sites}`)

	function prepareLat(coor) {
		coor = coor.replace(/\s/g, ""); // remove whitespaces from query
		return coor.split(',')[0] // return array object of coordinate
	}
	function prepareLong(coor) {
		coor = coor.replace(/\s/g, ""); // remove whitespaces from query
		return coor.split(',')[1] // return array object of coordinate
	}
	function calcDistToBox(lati, long) { 
		let to = L.latLng(lati, long)
		let totalDist = []
		let odps = []
		console.log(`starting calculation to coordinate ${to}`)
		//
		// GET ODP FROM DATABASE
		console.log(`TEST FUNCTION PREPARE LAT ${prepareLat(sites[0].site_location_maps)}`)
		
		sites.forEach(site => {
			let from = L.latLng(prepareLat(site.site_location_maps), prepareLong(site.site_location_maps))
			totalDist.push(to.distanceTo(from));
			odps.push({odp : site.site_name, distance : to.distanceTo(from)})

		})
		// look for CLOSEST ODP by comparing data between site.distance and lowest number of totalDist array
		let closest_odp = odps.filter((site) => site.distance === Math.min.apply(null, totalDist))
		console.log(`CALCULATED FOR ODP : ${closest_odp[0].odp} with distance of ${closest_odp[0].distance}`)
		return Math.min.apply(null, totalDist).toFixed(2)

		// THIS ONE USES DUMMY
		box_distributions.forEach(post => {
			let from = L.latLng(post.la, post.long)
			console.log(`${post.name} with ${to.distanceTo(from)}`);
			totalDist.push(to.distanceTo(from))
		});
		// console.log(`shortest : ${Math.min.apply(null, totalDist).toFixed(2)}`);
		// return Math.min.apply(null, totalDist).toFixed(2)
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
			setLeto([e.latlng.lat, e.latlng.lng])
			console.log(`lat : ${e.latlng.lat} & leto : ${e.latlng.lng}`);
			map.flyTo(e.latlng, map.getZoom()); // Center the map on the location
		  });
		  setFetchLocation(false)
		}
	  
		return null;
	  }
	function statusCheck(dist) {
		if (dist > 350) {
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
			let cleanAddress = ''
			let caCate = ['road', 'village', 'city', 'state', 'postcode']
			for (let detail in response.data.address) {
				if (caCate.indexOf(detail) === -1 ) { // IF ADDERSS CATEGORY IS NOT COMPLIANT TO THE caCate, then SKIP
				} else {
					cleanAddress += `${response.data.address[detail]}, `
				}
			}
            console.log(response)
			setCustRequest((request) => ({
				...request,
				address: cleanAddress,
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
		<button className="bg-acce p-3 rounded-md text-bg text-md block m-auto mb-10" onClick={handleLocationClick}>CHECK LOCATION</button>
		<small className='text-txt text-center'></small>
		<div className={ custRequest.address ? `checks text-txt sm:block bg-seco py-7 rounded-md w-4/5 m-auto md:flex justify-evenly md:items-center mb-7` : 'hidden'}>
			<div id='map' className="w-[340px] h-[260px] sm:w-full sm:p-5">
			<MapContainer center={[-7.604425054489175, 110.81664186804254]} zoom={16} className='h-10'>
				<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/* LocationMarker will only ran when fetchLocation == true */}
				<LocationMarker fetchLocation={fetchLocation} />
			</MapContainer>
			</div>
			<div className="detail w-1/2 sm:w-full sm:p-7 text-bg">
				<h1 className='text-3xl mb-5'>Your Request : </h1>
				<p className='mb-3'>Your address : { custRequest.address ? custRequest.address : 'empty' }</p>
				<p className='mb-3'>Packet : { custRequest.packet ? `${custRequest.packet} Mbps`: `choose packet `}</p>
				<p className='mb-3'>Estimated distance : { custRequest.distance ? `${custRequest.distance} m` : 'calculating...'}</p>
				<p className='mb-3'>Estimated price : <span className={ custRequest.status ? `before:content-['Rp_']` : `p-2 bg-red-600 rounded-md`}>{ custRequest.initial_price && custRequest.status ? `${custRequest.initial_price}`: `choose packet `}</span></p>
				<p className='mb-3'>Availability : <span className={ custRequest.status ? `p-2 bg-green-700 rounded-md text-white` : `p-2 bg-red-600 rounded-md`}>{ custRequest.status ? 'AVAILABLE' : 'NOT AVAILABLE FOR THIS LOCATION'} </span></p>
			</div>
		</div>
        </>
     );
}
 
export default LeafletMap;