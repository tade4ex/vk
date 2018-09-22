import jsonp from "jsonp";

class VkApi {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.timeRequests = 0;
    this.countRequests = 0;
  }

  generateUrl (method, params) {
    let url = "https://api.vk.com/method/" + method + "?";
    params = Object.keys(params).map((name) => name + "=" + params[name]).join("&");
    return url + params;
  }

  jsonp(method, params, success, error) {
    let startTime = new Date().getTime();
    jsonp(this.generateUrl(method, Object.assign({
      access_token: this.accessToken,
      v: 5.85
    }, params)), null, (err, data) => {
      if (err == null) {
        if (data.error != null) {
          return error(data.error);
        }
        let endTime = new Date().getTime();
        this.countRequests++;
        this.timeRequests+= endTime - startTime;
        let timeout = this.getTimeoutRequest();
        console.log('req', this.countRequests, this.timeRequests, timeout);
        setTimeout(() => {
          return success(data.response);
        }, timeout);
      } else {
        return error(err);
      }
    });
  }

  getTimeoutRequest() {
    if (this.countRequests > 2) {
      this.countRequests = 0;
      if (this.timeRequests < 1000) {
        let timeout = 1500 - this.timeRequests;
        this.timeRequests = 0;
        return timeout;
      }
      this.timeRequests = this.timeRequests%1000;
    }
    return 0;
  }

}

export default VkApi;
