import axios from "axios";

const dev = true;
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

const buyFish = (sessionId) => {
    return axios.post(`${rootUrl()}/fish/${sessionId}`)
}

const postFish = (payload) => {
    return axios.post(`${rootUrl()}/fish`, { ...payload })
                .then(response => response.data);
}

const createCheckoutSession = (fishId) => {
    return axios.post(`${rootUrl()}/create-checkout-session`, { fishId }, { headers: { 'Content-Type': 'application/json' } })
}
export {
    getFish,
    postFish,
    buyFish,
    createCheckoutSession
}