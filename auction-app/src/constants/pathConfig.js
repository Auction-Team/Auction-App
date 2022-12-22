export const pathConfig = {
  register: {
    path: '/register',
  },
  login: {
    path: '/login',
    permission: []
  },
  admin: {
    path: '/admins',
    permission: []
  },
  error: {
    forbidden: '/forbidden',
    serverError: '/error'
  }
};
