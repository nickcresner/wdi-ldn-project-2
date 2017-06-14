module.exports = {
  facebook: {
    loginUrl: 'https://www.facebook.com/v2.9/dialog/oauth',
    // accessTokenURL: '',
    clientId: process.env.FACEBOOK_APP_ID,
    // clientSecret: ,
    redirectUri: 'http://localhost:8000/oauth/facebook',
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // response_type: 'token',
    // state: 'oauthstate',
    scope: 'email, user_hometown',
    accessTokenUrl: 'https://graph.facebook.com/v2.9/oauth/access_token',
    // profileURL: 'https://api.github.com/user'
    // scope: 'user:email',
    getLoginURL() {
      return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    }
  }
};
