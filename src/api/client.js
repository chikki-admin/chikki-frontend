import axios from "axios";

const dev = false;
const rootUrl = () => {
    if (dev) {
        return "http://localhost:8000";
    } else {
        return "http://18.223.108.214"
    }
}

const getFish = (params={}) => {
  return axios.get(`${rootUrl()}/fish`, { params })
                .then(response => response.data);
}

const buyFish = (id) => {
    return axios.put(`${rootUrl()}/fish/${id}`)
}

const postFish = (payload) => {
    return axios.post(`${rootUrl()}/fish`, { ...payload })
                .then(response => response.data);
}
export {
    getFish,
    postFish,
    buyFish
}