import axios from "axios";

const dev = true;
const rootUrl = () => {
    if (dev) {
        return "http://localhost:8000";
    } else {
        return "18.223.108.214"
    }
}

const getFish = (params={}) => {
  return axios.get(`${rootUrl()}/fish`, { params })
                .then(response => response.data);
}

const postFish = (payload) => {
    return axios.post(`${rootUrl()}/fish`, { ...payload })
                .then(response => response.data);
}
export {
    getFish,
    postFish
}