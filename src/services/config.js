const devBaseURL = "/";
const proBaseURL = "http://47.96.166.224:8089";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const TIMEOUT = 10000;
