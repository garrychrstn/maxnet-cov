import axios from 'axios'

const osmAddress = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org/',
    headers: {
        'Content-Type' : 'application/json',
    }
})


export default osmAddress;