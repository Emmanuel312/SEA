import axios from 'axios'

const api = axios.create(
{
    baseURL: 'https://seavoicemail.herokuapp.com'
})

export default api