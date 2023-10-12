/// <reference types="vite/client" />

export default {
  oauth: {
    token_url: import.meta.env.VITE_OAUTH_TOKEN_URL,
    login_url: import.meta.env.VITE_OAUTH_LOGIN_URL,
    logout_url: import.meta.env.VITE_OAUTH_LOGOUT_URL,
    transition_token_coockies_name: import.meta.env.VITE_TRANSITION_TOKEN_COOKIES_NAME || "sessionuikey",
  },
  apps_client: {
    main_webapp_url: import.meta.env.VITE_MAIN_WEBPAGE_URL,
  },
};
