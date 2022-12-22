const baseHeader = {
  'Content-Type': 'application/json',
  Accept: '*/*',
};

const apiConfig = {
  account: {
    login: {
      path: '/v1/account/login',
      method: 'POST',
      headers: baseHeader,
    },
    logout: {
      path: '/v1/account/logout',
      method: 'GET',
      headers: baseHeader,
    },
    getAdminProfile: {
      path: '/v1/account/profile',
      method: 'GET',
      headers: baseHeader,
    },
    updateProfileAdmin: {
      path: '/v1/account/update_profile',
      method: 'PUT',
      headers: baseHeader,
    },
  },
};

export default apiConfig
