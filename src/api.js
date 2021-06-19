/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import axios from 'axios'

const url = 'http://192.168.0.105:8000/'
const api = axios.create({
    baseURL: url,
})

export {
    api,
    url,
}