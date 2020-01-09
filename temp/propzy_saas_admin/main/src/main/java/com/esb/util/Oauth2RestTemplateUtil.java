package com.esb.util;

// package com.daviteq.cloud.rest.client;
//
// import java.nio.charset.Charset;
// import java.util.HashMap;
// import java.util.Map;
//
// import org.apache.log4j.Logger;
// import org.springframework.http.HttpEntity;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpMethod;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.client.RestTemplate;
//
// import com.daviteq.ems.entity.Account;
// import com.daviteq.ems.entity.User;
// import com.daviteq.ems.entity.config.GlobalPropertiesConfig;
// import com.daviteq.ems.utils.Base64;
// import com.daviteq.ems.utils.Util;
// import com.google.gson.Gson;
//
// public class Oauth2RestTemplateUtil {
//
// private static final Logger log =
// Logger.getLogger(Oauth2RestTemplateUtil.class);
//
// private AccessToken accessToken;
//
// private String authorizationUrl;
//
// private User user;
//
// public Oauth2RestTemplateUtil(User user) {
// this.user = user;
// this.authorizationUrl =
// GlobalPropertiesConfig.getInstance().getAuthorizationServerUrl();
// this.getAccessToken(user);
// }
//
// public Oauth2RestTemplateUtil() {}
//
// public void getAccessToken(User user) {
// AccessToken accessTokenTemp = user.getAccessToken();
// if(accessTokenTemp == null) {
// Account account = user.getAccount();
// this.accessToken = this.getAccessToken(account.getAppKey(),
// account.getSecretKey(),
// user.getUsername(), user.getPassword());
// user.setAccessToken(this.accessToken);
// } else {
// this.accessToken = accessTokenTemp;
// }
// }
//
// public AccessToken getAccessToken(String clientId, String clientSecret,
// String username, String password) {
// AccessToken accessToken = null;
// Gson gs = new Gson();
//
// StringBuffer url = new StringBuffer();
// url.append(authorizationUrl);
// url.append("/oauth/token?");
// url.append("grant_type={grant_type}");
// url.append("&username={username}");
// url.append("&password={password}");
// url.append("&client_id={client_id}");
// url.append("&client_secret={client_secret}");
// url.append("&scope={scope}");
//
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("client_id", clientId);
// params.put("client_secret", clientSecret);
// params.put("username", username);
// params.put("password", password);
// params.put("grant_type", "password");
// params.put("scope", "read");
//
// try {
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// ResponseEntity<String> out = restTemplate.exchange(url.toString(),
// HttpMethod.POST, httpEntity, String.class, params);
// String resultJsonResp = out.getBody();
// accessToken = gs.fromJson(resultJsonResp, AccessToken.class);
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// return accessToken;
// }
//
// public void refreshToken(User user) {
// // minhnhut.pham modify start
//// Account account = user.getAccount();
//// AccessToken accessTokenTemp = this
//// .refreshToken(account.getAppKey(), account.getSecretKey(),
//// user.getAccessToken().getRefreshToken());
//// this.accessToken = accessTokenTemp;
//// user.setAccessToken(this.accessToken);
// user.setAccessToken(null);
// this.getAccessToken(user);
// // minhnhut.pham modify end
// }
//
// public AccessToken refreshToken(String clientId,
// String clientSecret, String refreshToken) {
// Gson gs = new Gson();
// AccessToken accessToken = null;
// try {
// StringBuffer url = new StringBuffer();
// url.append(authorizationUrl);
// url.append("/oauth/token?");
// url.append("grant_type={grant_type}");
// url.append("&client_id={client_id}");
// url.append("&client_secret={client_secret}");
// url.append("&scope={scope}");
// url.append("&refresh_token={refresh_token}");
//
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("grant_type", "refresh_token");
// params.put("client_id", clientId);
// params.put("client_secret", clientSecret);
// params.put("scope", "read");
// params.put("refresh_token", refreshToken);
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// ResponseEntity<String> out = restTemplate.exchange(url.toString(),
// HttpMethod.POST, httpEntity, String.class, params);
// String resultJsonResp = out.getBody();
//
// accessToken = gs.fromJson(resultJsonResp, AccessToken.class);
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// return accessToken;
// }
//
// private String addRequestParam(String url, String param) {
// if(url.indexOf("?") == -1) {
// url+="?";
// } else {
// url+="&";
// }
// url+=param+"={"+param+"}";
// return url;
// }
//
// private String addAccessTokenParam(String url) {
// return this.addRequestParam(url, "access_token");
// }
//
// private String decode(String value) {
// try {
// value = new String(Base64.decode(value), "UTF-8");
// } catch(Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// return value;
// }
//
// public String doGetWithAuthentication(String url) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.GET, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token", this.accessToken.getAccessToken());
// }
//
// try {
// if(this.accessToken != null){
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.GET, httpEntity, String.class,
// params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doGet(String url, Map<String, Object> params) {
// String ret = null;
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.GET, httpEntity, String.class, params);
// ret = this.decode(out.getBody());
// } catch(Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// return ret;
// }
//
// public String doGetUnDecode(String url) {
// String ret = null;
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.GET, httpEntity, String.class);
// ret = out.getBody();
// } catch(Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// return ret;
// }
//
// public String doGetWithAuthentication(String url, Map<String, Object> params)
// {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.GET, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if(this.accessToken != null){
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.GET, httpEntity, String.class,
// params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doGetWithAuthentication(String url, Object entity) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.GET, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.GET, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPostWithAuthentication(String url) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPost(String url, Map<String, Object> params) {
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
//
// public String doPost(String url, Object entity) {
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class);
// return this.decode(out.getBody());
// }
//
// public String doPost(String url, Object entity, Map<String, Object> params) {
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
//
// public String doPostWithAuthentication(String url, Map<String, Object>
// params) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPostWithAuthentication(String url, Object entity) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPostWithAuthentication(String url, Object entity,
// Map<String, Object> params) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.POST, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPutWithAuthentication(String url) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(
// url, HttpMethod.PUT, httpEntity, String.class,
// params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPutWithAuthentication(String url, Map<String, Object> params)
// {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPutWithAuthentication(String url, Object entity) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doPut(String url, Object entity, Map<String, Object> params) {
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
//
// public String doPut(String url, Map<String, Object> params) {
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
//
// public String doPutWithAuthentication(String url, Object entity,
// Map<String, Object> params) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(entity, headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token",this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.PUT, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doDelete(String url, Map<String, Object> params) {
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.DELETE, httpEntity, String.class, params);
// return this.decode(out.getBody());
// }
//
// public String doDeleteWithAuthentication(String url) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// Map<String, Object> params = new HashMap<String, Object>();
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.DELETE, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token", this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.DELETE, httpEntity, String.class,
// params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String doDeleteWithAuthentication(String url, Map<String, Object>
// params) {
// if (this.accessToken != null) {
// url = this.addAccessTokenParam(url);
// params.put("access_token", this.accessToken.getAccessToken());
//
// RestTemplate restTemplate = new RestTemplate();
// HttpHeaders headers = getHeaders();
// HttpEntity httpEntity = new HttpEntity(headers);
// try {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.DELETE, httpEntity, String.class, params);
// return this.decode(out.getBody());
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// this.refreshToken(user);
// params.put("access_token", this.accessToken.getAccessToken());
// }
//
// try {
// if (this.accessToken != null) {
// ResponseEntity<String> out = restTemplate.exchange(url,
// HttpMethod.DELETE, httpEntity, String.class,
// params);
// return this.decode(out.getBody());
// }
// } catch (Exception ex) {
// log.error(Util.convertExceptionToString(ex));
// }
// }
// return null;
// }
//
// public String buildUrl(String... args) {
// StringBuffer urlBuffer = new StringBuffer();
// for (int i = 0, n = args.length; i < n; i++) {
// urlBuffer.append("/");
// urlBuffer.append(args[i]);
// }
// return urlBuffer.toString();
// }
//
// public HttpHeaders getHeaders() {
// HttpHeaders headers = new HttpHeaders();
// MediaType mediaType = new MediaType(
// "text", "plain", Charset.forName("UTF-8"));
// headers.setContentType(mediaType);
// return headers;
// }
//
// public String getAuthorizationUrl() {
// return authorizationUrl;
// }
//
// public void setAuthorizationUrl(String authorizationUrl) {
// this.authorizationUrl = authorizationUrl;
// }
//
// public AccessToken getAccessToken() {
// return accessToken;
// }
//
// public void setAccessToken(AccessToken accessToken) {
// this.accessToken = accessToken;
// }
// }
