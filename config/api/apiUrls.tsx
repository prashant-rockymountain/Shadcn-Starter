const localSocket = "ws://localhost:13006"
const liveSocket = "wss://saviour-backend.loopretail.tngwebsolutions.com"

const localUrl = "http://localhost:3000/"
const liveUrl = "https://auth.loop.rockymountaintech.co/"
const liveAuthUrl = "https://auth.loop.rockymountaintech.co/"

export const ApiUrl = process.env.NODE_ENV !== "development" ?
  {
    BASE_URL: localUrl,
    SOCKET_BASE_URL: localSocket,
    LOGIN_URL: `${localUrl}auth/store/login`,
    AUTH_LOGOUT: `${localUrl}auth/logout`,
    ROLE_NAMES_URL: `${localUrl}role`,
    ROLE_MODULES_URL: `${localUrl}role-option`,
  } : {
    BASE_URL: liveUrl,
    SOCKET_BASE_URL: liveSocket,
    LOGIN_URL: `${liveAuthUrl}auth/store/login`,
    AUTH_LOGOUT: `${liveAuthUrl}auth/logout`,
    ROLE_NAMES_URL: `${liveUrl}role`,
    ROLE_MODULES_URL: `${liveUrl}role-option`,
  }


export const graphqlQuerys = {
  ADMIN_GET_QUERY: `query{ping}`,
};
