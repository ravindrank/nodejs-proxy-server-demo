// npm install client-oauth2 --save
const clientOAuth2 = require("client-oauth2");

var githubAuth = new clientOAuth2({
  clientId: "abc",
  clientSecret: "123",
  accessTokenUri: "https://github.com/login/oauth/access_token",
  authorizationUri: "https://github.com/login/oauth/authorize",
  redirectUri: "http://example.com/auth/github/callback",
  scopes: ["notifications", "gist"],
});

// form data

const formData = new URLSearchParams();
formData.append("clientId", "value1");
formData.append("clientSecret", "value2");
formData.append("scope", "value2");
formData.append("grant_type", "value2");

const response = await axios.request({
  url: "https://example.com",
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  data: formData,
});
