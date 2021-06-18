/* eslint-disable prettier/prettier */
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.URL || 'http://192.168.0.105:3000/'
})

export default api