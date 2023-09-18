
import axios from "axios"

const baiUrl="https://united-service-dsm.onrender.com"


const instance=axios.create({

    baseURL:baiUrl 
})

export default instance ;