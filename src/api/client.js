import axios from "axios";

const rootUrl = "http://localhost:8000";

const getFish = (params={}) => {
  return axios.get(`${rootUrl}/fish`, { params })
                .then(response => response.data);
}

export {
    getFish
}