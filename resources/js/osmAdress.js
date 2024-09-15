import axios from 'axios'

const osmAddress = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org/reverse',
    headers: {
        'Content-Type' : 'application/json',
    }
})


export default osmAddress;