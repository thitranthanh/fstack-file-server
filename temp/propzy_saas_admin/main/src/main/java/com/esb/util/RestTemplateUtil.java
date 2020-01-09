package com.esb.util;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.esb.consts.GlobalConsts;
import com.google.gson.Gson;

public class RestTemplateUtil {

    private static final Logger log = Logger.getLogger(RestTemplateUtil.class);

    private static final Gson gson = new Gson();

    public RestTemplateUtil() {
    }

    public static String doGetWithAuthentication(String url, String apiKey, String secretKey, String publicKeyPath) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> signature = getSignature(apiKey, secretKey, publicKeyPath);
            HttpHeaders headers = getHeadersForAuthentication(signature);
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doGetWithAuthentication(String url, Map<String, Object> params, String apiKey,
            String secretKey, String publicKeyPath) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> signature = getSignature(apiKey, secretKey, publicKeyPath);
            HttpHeaders headers = getHeadersForAuthentication(signature);
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class, params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPostWithAuthentication(String url, Map<String, Object> params, String apiKey,
            String secretKey, String publicKeyPath) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> signature = getSignature(apiKey, secretKey, publicKeyPath);
            HttpHeaders headers = getHeadersForAuthentication(signature);
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class, params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPostWithAuthentication(String url, Object entity, String apiKey, String secretKey,
            String publicKeyPath) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> signature = getSignature(apiKey, secretKey, publicKeyPath);
            HttpHeaders headers = getHeadersForAuthentication(signature);
            HttpEntity httpEntity = new HttpEntity(entity, headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPutWithAuthentication(String url, Object entity, Map<String, Object> params, String apiKey,
            String secretKey, String publicKeyPath) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> signature = getSignature(apiKey, secretKey, publicKeyPath);
            HttpHeaders headers = getHeadersForAuthentication(signature);
            HttpEntity httpEntity = new HttpEntity(entity, headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, String.class, params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPutWithAuthentication(String url, Map<String, Object> params, String apiKey,
            String secretKey, String publicKeyPath) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> signature = getSignature(apiKey, secretKey, publicKeyPath);
            HttpHeaders headers = getHeadersForAuthentication(signature);
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, String.class, params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doDeleteWithAuthentication(String url, Map<String, Object> params, String apiKey,
            String secretKey, String publicKeyPath) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> signature = getSignature(apiKey, secretKey, publicKeyPath);
            HttpHeaders headers = getHeadersForAuthentication(signature);
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, String.class,
                    params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    private static HttpHeaders getHeadersForAuthentication(Map<String, String> signature) {
        HttpHeaders headers = new HttpHeaders();
        try {
            MediaType mediaType = new MediaType("text", "plain", Charset.forName("UTF-8"));
            headers.setContentType(mediaType);
            for (Map.Entry<String, String> entry : signature.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                headers.add(key, value);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return headers;
    }

    private static Map<String, String> getSignature(String apiKey, String secretKey, String publicKeyPath) {
        Map<String, String> signature = new HashMap<String, String>();
        try {
            String encodedSecretKey = Base64.encode(RSA.encrypt(secretKey, publicKeyPath).getBytes());
            signature.put("api-key", apiKey);
            signature.put("secret-key", encodedSecretKey);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return signature;
    }

    public static HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        MediaType mediaType = new MediaType("text", "plain", Charset.forName("UTF-8"));
        headers.setContentType(mediaType);
        return headers;
    }

    public static String doGet(String url, Map<String, Object> params) {
        String ret = null;
        try {
            log.info("url: " + url);
            log.info("params: " + gson.toJson(params));
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = getHeaders();
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class, params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doGet(String url) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = getHeaders();
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPost(String url, Map<String, Object> params) {
        String ret = null;
        try {
            log.info("url: " + url);
            log.info("params: " + gson.toJson(params));
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = getHeaders();
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class, params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPost(String url, Object entity) {
        String ret = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = getHeaders();
            HttpEntity httpEntity = new HttpEntity(entity, headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPut(String url, Object entity, Map<String, Object> params) {
        String ret = null;
        try {
            log.info("url: " + url);
            log.info("params: " + gson.toJson(params));
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = getHeaders();
            HttpEntity httpEntity = new HttpEntity(entity, headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, String.class, params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doPut(String url, Map<String, Object> params) {
        String ret = null;
        try {
            log.info("url: " + url);
            log.info("params: " + gson.toJson(params));
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = getHeaders();
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, String.class, params);
            return out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String doDelete(String url, Map<String, Object> params) {
        String ret = null;
        try {
            log.info("url: " + url);
            log.info("params: " + gson.toJson(params));
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = getHeaders();
            HttpEntity httpEntity = new HttpEntity(headers);
            ResponseEntity<String> out = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, String.class,
                    params);
            ret = out.getBody();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static String callWSWithoutAuthenHeader(String url, String method, Map<String, Object> params) {
        String ret = null;
        try {
            if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_GET)) {
                if (params == null) {
                    ret = doGet(url);
                } else {
                    ret = doGet(url, params);
                }
            } else if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_POST)) {
                ret = doPost(url, params);
            } else if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_PUT)) {
                ret = doPut(url, params);
            } else if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_DELETE)) {
                ret = doDelete(url, params);
            } else {
                // this is not support
                log.warn("This is method not support");
            }
        } catch (Exception e) {
            log.error(Util.convertExceptionToString(e));
        }
        return ret;
    }

    public static String callWSWithAuthenHeader(String url, String method, Map<String, Object> params, String apiKey,
            String secretKey, String rsaPubKeyPath) {
        String ret = null;
        try {
            if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_GET)) {
                ret = doGetWithAuthentication(url, params, apiKey, secretKey, rsaPubKeyPath);
            } else if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_POST)) {
                ret = doPostWithAuthentication(url, params, apiKey, secretKey, rsaPubKeyPath);
            } else if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_PUT)) {
                ret = doPostWithAuthentication(url, params, apiKey, secretKey, rsaPubKeyPath);
            } else if (method.equalsIgnoreCase(GlobalConsts.SERVICE_METHOD_DELETE)) {
                ret = doDeleteWithAuthentication(url, params, apiKey, secretKey, rsaPubKeyPath);
            } else {
                // this is not support
                log.warn("This is method not support");
            }
        } catch (Exception e) {
            log.error(Util.convertExceptionToString(e));
        }
        return ret;
    }

}
