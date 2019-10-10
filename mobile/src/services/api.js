import axios from 'axios'

const api = axios.create(
{
    baseURL: 'http://10.21.25.239:3000'
})

export default api