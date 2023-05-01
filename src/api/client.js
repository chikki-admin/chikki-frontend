import axios from "axios";

const dev = false;
const rootUrl = () => {
    if (dev) {
        return "http://localhost:8000";
    } else {
        return "https://18.223.108.214"
    }
}

const getSellerId = (sellerId) => {
    return axios.get(`${rootUrl()}/auth/seller/${sellerId}`,{
        withCredentials: true,
        crossDomain: true})
        .then(response => response.data);
}

const getFishBySellerId = (sellerId) => {
    return axios.get(`${rootUrl()}/seller/${sellerId}/fish`, {
        withCredentials: true,
        crossDomain: true
    }).then(response => response.data);
}

const getFish = (params={}) => {
  return axios.get(`${rootUrl()}/fish`, { params, withCredentials: true, crossDomain: true })
                .then(response => response.data);
}

const getFishPagination = (offSet) => {
    return axios.get(`${rootUrl()}/fish/pagination/${offSet}`, {withCredentials: true, crossDomain: true})
                  .then(response => response.data);
  }

const buyFish = (sessionId) => {
    return axios.post(`${rootUrl()}/fish/${sessionId}`, {withCredentials: true, crossDomain: true})
}

const postFish = (payload) => {
    return axios.post(`${rootUrl()}/fish`, { ...payload }, { headers: {"Authorization" : `Bearer ${payload.token}`} } )
                .then(response => response.data);
}

const deleteFish = (fishId, token) => {
    return axios.delete(`${rootUrl()}/fish/${fishId}`, { headers: {"Authorization" : `Bearer ${token}`} })
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
    deleteFish,
    getFishPagination,

    // seller path
    getSellerId,
    
    // User path
    getUser,
    postUser,

    // Stripe path
    createCheckoutSession
}