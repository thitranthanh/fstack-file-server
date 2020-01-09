package com.esb.entity.config;

public class GlobalConfig {

    public static final String GLOBAL_COMPANY_NAME = "global.company.name";
    public static final String GLOBAL_FOLDER_TEMPORARY = "global.folder.temporary";
    public static final String GLOBAL_IS_AUTHEN_HEADER = "global.authentication";
    public static final String GLOBAL_RSA_PRIVATE_KEY_PATH = "global.rsa.private_key.path";
    public static final String GLOBAL_API_KEY = "global.api_key";
    public static final String GLOBAL_SECRET_KEY = "global.secret_key";

    public static GlobalConfig globalConfig = new GlobalConfig();

    private GlobalConfig() {
    }

    private static class Loader {

        private static final GlobalConfig INSTANCE = globalConfig;
    }

    public static GlobalConfig getInstance() {
        return Loader.INSTANCE;
    }

    private transient String companyName;
    private transient String temporaryFolder;
    private transient boolean authenticationHeader;
    private transient String rsaPrivateKeyPath;
    private transient String apiKey;
    private transient String secretKey;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTemporaryFolder() {
        return temporaryFolder;
    }

    public void setTemporaryFolder(String temporaryFolder) {
        this.temporaryFolder = temporaryFolder;
    }

    public boolean isAuthenticationHeader() {
        return authenticationHeader;
    }

    public void setAuthenticationHeader(boolean authenticationHeader) {
        this.authenticationHeader = authenticationHeader;
    }

    public String getRsaPrivateKeyPath() {
        return rsaPrivateKeyPath;
    }

    public void setRsaPrivateKeyPath(String rsaPrivateKeyPath) {
        this.rsaPrivateKeyPath = rsaPrivateKeyPath;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Global config is loaded. Please check the information below:").append("\n");
        sb.append(GLOBAL_COMPANY_NAME).append("=").append(companyName).append("\n");
        sb.append(GLOBAL_FOLDER_TEMPORARY).append("=").append(temporaryFolder).append("\n");
        sb.append(GLOBAL_IS_AUTHEN_HEADER).append("=").append(authenticationHeader).append("\n");
        sb.append(GLOBAL_RSA_PRIVATE_KEY_PATH).append("=").append(rsaPrivateKeyPath).append("\n");
        sb.append(GLOBAL_API_KEY).append("=").append(apiKey).append("\n");
        sb.append(GLOBAL_SECRET_KEY).append("=").append(secretKey).append("\n");
        return sb.toString();
    }

}