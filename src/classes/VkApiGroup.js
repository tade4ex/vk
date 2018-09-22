import VkApi from './VkApi';

class VkApiGroup extends VkApi {
  constructor() {
    super(...arguments);
  }

  getGroupStats(groupId) {
    return new Promise((resolve, reject) => {
      this.getGroup(groupId).then((data) => {
        if (typeof data === "object" && data.length > 0) {
          let group = data[0];
          this.getMembers(group.id, 1000, 0).then((data) => {
            let users = data;
            this.getWall(group.id, 40000, 0).then((data) => {
              let posts = data;
              this.getPostsLikes(group.id, data.map((post) => post.id)).then((data) => {
                let likes = data;

                /* group users */
                let usersObj = {};
                let usersAge = {};
                let usersSex = {};
                let usersCountryCity = {};
                let countryCityNames = {};
                users.map((user) => {
                  // usersObj[user.uid] = user;
                  usersObj[user.id] = user;
                  if (user.bdate != null) {
                    let age = new Date().getFullYear() - user.bdate.split('.')[2];
                    if (!isNaN(age)) {
                      usersAge[age] = usersAge[age] + 1 || 1;
                    }
                  }
                  if (user.sex != null) {
                    usersSex[user.sex] = usersSex[user.sex] + 1 || 1;
                  }
                  /* v5.x */
                  if (user.country != null && user.city != null) {
                    let id = user.country.id + '' + user.city.id;
                    let name = user.country.title + '/' + user.city.title;
                    usersCountryCity[id] = usersCountryCity[id] + 1 || 1;
                    if (countryCityNames[id] == null) {
                      countryCityNames[id] = name;
                    }
                  }
                  /* v3.x */
                  // if (user.country != null && user.city != null) {
                  //   let id = user.country + '' + user.city;
                  //   usersCountryCity[id] = usersCountryCity[id] + 1 || 1;
                  //   if (countryCityNames[id] == null) {
                  //     countryCityNames[id] = id;
                  //   }
                  // }
                });

                /* group posts */
                let postsObj = {};
                let postsLike = [];
                let postsView = [];
                let userLikes = {};
                posts.map((post) => {
                  postsObj[post.id] = post;
                  if (post.likes != null) {
                    postsLike.push(post.likes.count || 0);
                  }
                  if (post.views != null) {
                    postsView.push(post.views.count || 0);
                  }
                  likes[post.id].map((user) => {
                    if (usersObj[user.id] != null) {
                      userLikes[user.id] = userLikes[user.id] + 1 || 1;
                    }
                  });
                });

                let postsLikeArg = 0;
                if (postsLike.length > 0) {
                  postsLikeArg = postsLike.reduce(function (a, b) {
                    return a + b;
                  }, 0) / postsLike.length;
                }

                let postsViewArg = 0;
                if (postsView.length > 0) {
                  postsViewArg = postsView.reduce(function (a, b) {
                    return a + b;
                  }, 0) / postsView.length;
                }

                let userMaxLikes = null;
                if (Object.keys(userLikes).length > 0) {
                  let userMaxLikesId = Object.keys(userLikes)[0];
                  Object.keys(userLikes).map((key) => {
                    if (userLikes[userMaxLikesId] < userLikes[key]) {
                      userMaxLikesId = key;
                    }
                  });
                  userMaxLikes = {
                    first_name: usersObj[userMaxLikesId].first_name,
                    last_name: usersObj[userMaxLikesId].last_name,
                    like_count: userLikes[userMaxLikesId]
                  };
                }

                resolve({
                  groupName: group.name,
                  groupDescription: group.description,
                  groupPhoto: group.photo_50,
                  usersAge: usersAge,
                  usersSex: usersSex,
                  usersCountryCity: usersCountryCity,
                  countryCityNames: countryCityNames,
                  postsLikeArg: postsLikeArg,
                  postsViewArg: postsViewArg,
                  userMaxLikes: userMaxLikes
                });
              });
            });
          });
        }
      });
    });
  }

  getGroup(groupId) {
    return new Promise((resolve, reject) => this.jsonp('groups.getById', {
      group_id: groupId,
      fields: 'description'
    }, resolve, reject));
  }

  getGroupList(userId) {
    return new Promise((resolve, reject) => {
      this.jsonp('groups.get', {
        user_id: userId,
        extended: 1
      }, resolve, reject);
    });
  }

  getMembers(groupId, count, offset, items) {
    items = items || [];
    return new Promise((resolve, reject) => {
      this.jsonp('groups.getMembers', {
        group_id: groupId,
        sort: 'id_asc',
        fields: 'sex,bdate,city,country,status,common_count,relation,lists,relatives,can_post',
        offset: offset,
        count: count,
        // v: 3.0
      }, (data) => {
        /* v: 3.0 */
        // items = items.concat(data.users);

        items = items.concat(data.items);
        if (data.count < offset + count) {
          return resolve(items);
        }
        resolve(this.getMembers(groupId, count, offset + count, items));
      }, reject);
    });
  }

  getWall(groupId, count, offset, items) {
    items = items || [];
    return new Promise((resolve, reject) => {
      this.jsonp('wall.get', {
        owner_id: groupId * -1,
        item_id: groupId,
        extended: 1,
        offset: offset,
        count: count,
      }, (data) => {
        items = items.concat(data.items);
        if (data.count < offset + count) {
          return resolve(items);
        }
        resolve(this.getWall(groupId, count, offset + count, items));
      }, reject);
    });
  }

  getPostsLikes(groupId, post_ids, index, len, postLikes) {
    index = index || 0;
    len = post_ids.length;
    postLikes = postLikes || {};
    return new Promise((resolve, reject) => {
      if (index === len) {
        return resolve(postLikes);
      }
      this.getPostLikes(groupId, post_ids[index], 20000, 0).then((data) => {
        postLikes[post_ids[index]] = data;
        resolve(this.getPostsLikes(groupId, post_ids, index + 1, len, postLikes));
      });
    });
  }

  getPostLikes(groupId, post_id, count, offset, items) {
    items = items || [];
    return new Promise((resolve, reject) => {
      this.jsonp('likes.getList', {
        owner_id: groupId * -1,
        item_id: post_id,
        extended: 1,
        offset: offset,
        count: count,
        type: 'post',
        filter: 'likes',
      }, (data) => {
        items = items.concat(data.items);
        if (data.count < offset + count) {
          return resolve(items);
        }
        resolve(this.getPostLikes(groupId, post_id, count, offset + count, items));
      }, reject);
    });
  }

}

export default VkApiGroup;
