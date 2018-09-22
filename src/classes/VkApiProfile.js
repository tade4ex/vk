import VkApi from './VkApi';

class VkApiProfile extends VkApi {
  constructor() {
    super(...arguments);
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.jsonp('users.get', {
        fields: 'first_name, last_name, photo_50',
      }, resolve, reject);
    });
  }
}

export default VkApiProfile;
