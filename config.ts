 

export default {
  oauth: {
    token_url: import.meta.env.VITE_OAUTH_TOKEN_URL || "https://auth.upo.cl/coauth/exchange",
    login_url: import.meta.env.VITE_OAUTH_LOGIN_URL || "https://oauth.upo.cl/oauth2/authorize",
    login_callback_url: import.meta.env.VITE_OAUTH_LOGIN_CALLBACK_URL || "https://auth.upo.cl/coauth/callback/",
    logout_url: import.meta.env.VITE_OAUTH_LOGOUT_URL,
    transition_token_coockies_name: import.meta.env.VITE_TRANSITION_TOKEN_COOKIES_NAME || "sessionuikey",
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
  },
  apps_client: {
    main_webapp_url: import.meta.env.VITE_MAIN_WEBPAGE_URL || "https://upo.cl/",
    main_app_url: import.meta.env.VITE_MAIN_APP_URL || "https://app.upo.cl/",
    
  },
};
