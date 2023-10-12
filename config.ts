 

export default {
  oauth: {
    token_url: process.env.VITE_OAUTH_TOKEN_URL,
    login_url: process.env.VITE_OAUTH_LOGIN_URL,
    logout_url: process.env.VITE_OAUTH_LOGOUT_URL,
    transition_token_coockies_name: process.env.VITE_TRANSITION_TOKEN_COOKIES_NAME || "sessionuikey",
  },
  apps_client: {
    main_webapp_url: process.env.VITE_MAIN_WEBPAGE_URL,
  },
};
