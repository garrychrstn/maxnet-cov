import osmAddress from '../osmAdress'
import { useEffect } from 'react';
import axios from 'axios';

const Osm = () => {
    let lat = '-7.557327198772382'
    let lon = '110.84773870390242'
    useEffect(() => {
        osmAddress.get('/reverse', {
            params: {
                format: 'jsonv2',
                lat: lat,
                lon: lon
            }
        })
        // axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-7.557327198772382&lon=110.84773870390242')
        .then((response) => {
            console.log(response)
        })
    }, [])
    
    return ( 
        <>
            <h1 className='text-center'>TEST OSM</h1>
        </>
     );
}
 
export default Osm;