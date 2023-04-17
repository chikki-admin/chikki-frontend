import axios from "axios";

const dev = true;
const rootUrl = () => {
    if (dev) {
        return "http://localhost:8000";
    } else {
        return "http://18.223.108.214"
    }
}

const getFishBySellerId = (sellerId) => {
    return axios.get(`${rootUrl()}/seller/${sellerId}/fish`).then(response => response.data);
}

const getFish = (params={}) => {
  return axios.get(`${rootUrl()}/fish`, { params })
                .then(response => response.data);
}

const buyFish = (sessionId) => {
    return axios.post(`${rootUrl()}/fish/${sessionId}`)
}

const postFish = (payload) => {
    return axios.post(`${rootUrl()}/fish`, { ...payload }, { headers: {"Authorization" : `Bearer ${payload.token}`} } )
                .then(response => response.data);
}

// Auth client
const getUser = ({ email, password }) => {
    return axios.post(`${rootUrl()}/auth/login`, { email, password });
}

const postUser = ({email, password}) => {
    return axios.post(`${rootUrl()}/auth`, { email, password }).then(response => response.data);
}

const createCheckoutSession = (fishId, fishPrice, fishName, imgSource) => {
    return axios.post(`${rootUrl()}/create-checkout-session`, { fishId, fishPrice, fishName, imgSource }, { headers: { 'Content-Type': 'application/json' } })
}
export {
    // Fish path
    getFish,
    postFish,
    buyFish,
    getFishBySellerId,
    
    // User path
    getUser,
    postUser,

    // Stripe path
    createCheckoutSession
}