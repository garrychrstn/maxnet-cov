import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'

const Leaflet = () => {
	
    return ( 
        <>
		<div id='map' className="m-auto w-4/5">
		  <MapContainer center={[-7.604425054489175, 110.81664186804254]} zoom={20} className='h-10'>
			<TileLayer
			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		  </MapContainer>
		</div>
        </>
     );
}
 
export default Leaflet;