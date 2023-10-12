module.exports = {
    oauth: {
        token_url: import.meta.env.VITE_OAUTH_TOKEN_URL,
        login_url: import.meta.env.VITE_OAUTH_LOGIN_URL,
        logout_url: import.meta.env.VITE_OAUTH_LOGOUT_URL,
    },
    apps_client: {
        main_webapp_url: import.meta.env.VITE_MAIN_WEBPAGE_URL,
    },
}