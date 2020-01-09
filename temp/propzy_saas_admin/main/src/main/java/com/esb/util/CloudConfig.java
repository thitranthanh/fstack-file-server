package com.esb.util;

import org.apache.log4j.Logger;

import com.esb.entity.config.GlobalConfig;

public class CloudConfig {

    private static final Logger log = Logger.getLogger(CloudConfig.class);

    private static CloudConfig instance;

    public static final String CONFIG_PATH = "C:/Users/DELL/Documents/convertToMySQL/propzy_saas_admin/conf";

    public static final String ESB_GLOBAL_CONFIG_PATH = CONFIG_PATH + "/global.properties";

    private CloudConfig() {
    }

    public static CloudConfig getInstance() {
        try {
            if (instance == null) {
                instance = new CloudConfig();
                instance.loadGlobalConfig();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            log.error(Util.convertExceptionToString(ex));
        }
        return instance;
    }

    public void loadGlobalConfig() {
        GlobalConfig globalConfig = GlobalConfig.getInstance();
        try {
            PropertiesUtil prop = new PropertiesUtil(ESB_GLOBAL_CONFIG_PATH);
            String companyName = prop.getString(GlobalConfig.GLOBAL_COMPANY_NAME);
            String temporaryFolder = prop.getString(GlobalConfig.GLOBAL_FOLDER_TEMPORARY);
            boolean authenHeader = prop.getBoolean(GlobalConfig.GLOBAL_IS_AUTHEN_HEADER);
            String rsaPrivateKeyPath = CONFIG_PATH + "/" + prop.getString(GlobalConfig.GLOBAL_RSA_PRIVATE_KEY_PATH);
            String apiKey = prop.getString(GlobalConfig.GLOBAL_API_KEY);
            String secretKey = prop.getString(GlobalConfig.GLOBAL_SECRET_KEY);

            globalConfig.setCompanyName(companyName);
            globalConfig.setTemporaryFolder(CONFIG_PATH + "/" + temporaryFolder);
            globalConfig.setAuthenticationHeader(authenHeader);
            globalConfig.setRsaPrivateKeyPath(rsaPrivateKeyPath);
            globalConfig.setApiKey(apiKey);
            globalConfig.setSecretKey(secretKey);

            log.debug(globalConfig.toString());

        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
    }

}
