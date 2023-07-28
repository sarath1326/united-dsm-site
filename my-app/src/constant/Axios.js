
import axios from "axios"

const baiUrl="http://localhost:3001"


const instance=axios.create({

    baseURL:baiUrl 
})

export default instance ;