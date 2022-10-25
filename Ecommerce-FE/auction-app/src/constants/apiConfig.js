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
    register: {
      path: '/v1/account/register',
      method: 'POST',
      headers: baseHeader,
    },
    logout: {
      path: '/v1/account/logout',
      method: 'GET',
      headers: baseHeader,
    },
  },
};

export default apiConfig
