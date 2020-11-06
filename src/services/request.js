import axios from 'axios';

class Request {
  appEndpoint;
  appCode;
  constructor() {
    this.appEndpoint = process.env.REACT_APP_APP_ENDPOINT;
  }

  async post(endpoint, payload, paramsArgs) {
    const url = `${this.appEndpoint}${endpoint}`;
    const params = { params: { ...paramsArgs } };
    return await axios.post(url, payload, params);
  }

  async put(endpoint, payload) {
    const url = `${this.appEndpoint}${endpoint}`;
    const result = await axios.put(url, payload);
    return result;
  }

  async get(endpoint, payload) {
    const url = `${this.appEndpoint}${endpoint}`;
    const params = { params: { ...payload } };
    return await axios.get(url, params);
  }

  async delete(endpoint, payload) {
    const url = `${this.appEndpoint}${endpoint}`;
    const params = { params: { ...payload } };
    return await axios.delete(url, params);
  }
}

export default new Request();
