/* eslint-disable class-methods-use-this */
// import api, { patch, uploadFile } from 'api/api-connection'
// import axios from "axios";

// const apiConnection = axios.create({ baseURL: "http://localhost/users" });
import apiConnection from "../pages/api/api-connection";

export class EventCalendar {
  getAvailability(adminId = "") {
    return new Promise((resolve, reject) => {
      apiConnection
        .get(`/users/adminConfig/${adminId}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  createUpdateAvailability(body) {
    return new Promise((resolve, reject) => {
      if (body._id) {
        apiConnection
          .patch(`/users/adminConfig/${body._id}`, body)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        apiConnection
          .post(`/users/adminConfig/create`, body)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  createEventType(body) {
    return new Promise((resolve, reject) => {
      apiConnection
        .post(`/users/CalendarEvent/create`, body)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateSavedEvent(id, body) {
    return new Promise((resolve, reject) => {
      apiConnection
        .patch(`/users/savedEvent/${id}`, body)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getEventTypes(adminId, body) {
    return new Promise((resolve, reject) => {
      apiConnection
        .post(`/users/CalendarEvent/filtered`, {
          adminsIds: { $in: [adminId] },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateEventTypes(id, body) {
    return new Promise((resolve, reject) => {
      apiConnection
        .patch(`/users/CalendarEvent/${id}`, body)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteEventType(id) {
    return new Promise((resolve, reject) => {
      apiConnection
        .delete(`/users/CalendarEvent/${id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAdminSavedEvent(adminId) {
    return new Promise((resolve, reject) => {
      apiConnection
        .post(`/users/SavedEvent/filtered`, {
          adminId,
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteAdminSavedEvent(id) {
    return new Promise((resolve, reject) => {
      apiConnection
        .delete(`/users/SavedEvent/${id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  connectWithGoogleCalendarURL() {
    return new Promise((resolve, reject) => {
      const redirectURL = window.location.hostname;
      apiConnection
        .get(`/users/GoogleCalendar/generateAuth/${redirectURL}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  saveToken(userId, token) {
    return new Promise((resolve, reject) => {
      const hostname = window.location.hostname;
      apiConnection
        .post(`/users/GoogleCalendar/saveToken/${hostname}`, { userId, token })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  userIsConnectedWithCalendar(userId) {
    return new Promise((resolve, reject) => {
      apiConnection
        .get(`/users/GoogleCalendar/getToken/${userId}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteUserGoogleToken(userId) {
    return new Promise((resolve, reject) => {
      apiConnection
        .delete(`/users/GoogleCalendar/${userId}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
