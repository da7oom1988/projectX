import axios from 'axios'

const instanse = axios.create({
    baseURL: 'http://165.22.42.15:4000/api'
})

export default instanse
