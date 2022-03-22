/* eslint-disable class-methods-use-this */
import apiConnection from "../pages/api/api-connection";

class User {
  static _id;

  currentAccount = () => {
    return new Promise((resolve, reject) => {
      // if (token) {
      apiConnection
        .get("/users/profile/get")
        .then((response) => {
          if (response) {
            resolve(response.data.data);
          }
          reject();
        })
        .catch((err) => reject(err));
      // }
    });
  };

  async getById(id) {
    return apiConnection.get(`/users/${id}`);
  }
}

export default User;
