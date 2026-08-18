import axios from 'axios'

const getImages = async (page = 1, limit = 20) => {
    try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.log("could not able to fetch images", error)
        throw error;
    }
}

export default { getImages }