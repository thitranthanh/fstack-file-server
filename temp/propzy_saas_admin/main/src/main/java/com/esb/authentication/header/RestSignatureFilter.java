package com.esb.authentication.header;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.esb.entity.config.GlobalConfig;
import com.esb.util.Base64;
import com.esb.util.CloudConfig;
import com.esb.util.RSA;
import com.esb.util.Util;

public class RestSignatureFilter implements Filter {

    private static final Logger log = Logger.getLogger(RestSignatureFilter.class);

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, filterConfig.getServletContext());
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        try {
            CloudConfig.getInstance();
            GlobalConfig globalCfg = GlobalConfig.getInstance();

            boolean result = false;
            if (!globalCfg.isAuthenticationHeader()) {
                result = true;
            } else {
                try {
                    String apiKey = request.getHeader("api-key");
                    String secretKey = request.getHeader("secret-key");
                    String decodedSecretKey = new String(Base64.decode(secretKey));
                    String decryptedSecretKey = RSA.decrypt(decodedSecretKey, globalCfg.getRsaPrivateKeyPath());
                    if (apiKey.equals(globalCfg.getApiKey()) && decryptedSecretKey.equals(globalCfg.getSecretKey())) {
                        result = true;
                    }
                } catch (Exception ex) {
                    log.warn(Util.convertExceptionToString(ex));
                }
            }

            if (result) {
                filterChain.doFilter(req, res);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error");
            return;
        }
    }

    @Override
    public void destroy() {
    }
}