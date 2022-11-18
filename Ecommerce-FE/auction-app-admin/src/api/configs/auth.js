export const AuthAPI = {
  register: (data) => ({
    url: "/auth/register",
    method: "POST",
    data,
  }),
  login: (data) => ({
    url: "/auth/login",
    method: "POST",
    data,
  }),
  forgotPassword: (data) => ({
    url: "/auth/forgot/password",
    method: "POST",
    data,
  }),
  resetPassword: (token, data) => ({
    url: `/auth/password/reset/${token}`,
    method: "POST",
    data,
  }),
  refreshToken: () => ({
    url: `/auth/refresh/token`,
    method: "GET",
  }),
  getProfile: () => ({
    url: "/auth/profile",
    method: "GET",
  }),
};
