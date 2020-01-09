package com.esb.util;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.apache.log4j.Logger;

public class CloudUtil {

    private final static Logger log = Logger.getLogger(CloudUtil.class);

    private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
            'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F' };

    public static String encryptPassword(String username, String password) {
        String encryptPassword = null;
        try {
            encryptPassword = encrypt("MD5", username + password);
        } catch (Exception ex) {
            log.warn(ex.getMessage());
        }
        return encryptPassword;
    }

    public static String encrypt(String instance, String input) throws NoSuchAlgorithmException {

        MessageDigest md = MessageDigest.getInstance(instance);
        byte[] dataBytes = new byte[1024];

        dataBytes = input.getBytes();
        md.update(dataBytes, 0, dataBytes.length);

        byte[] mdbytes = md.digest();

        return bytes2Hex(mdbytes).toUpperCase();
    }

    private static String bytes2Hex(byte[] buf) {
        StringBuffer sb = new StringBuffer();
        try {
            for (int i = 0; i < buf.length; i++) {
                sb.append(Integer.toString((buf[i] & 0xff) + 0x100, 16).substring(1));
            }
        } catch (Exception ex) {
        }
        return sb.toString();
    }

    public static boolean isNullOrEmpty(String value) {
        boolean ret = true;
        try {
            if (!value.isEmpty()) {
                ret = false;
            }
        } catch (Exception ex) {
        }
        return ret;
    }

    public static boolean isNullOrEmpty(Object value) {
        return CloudUtil.isNullOrEmpty(String.valueOf(value));
    }

    public static boolean isHexDigits(String input) {
        boolean ret = false;
        try {
            int hexDigitsCount = 0;
            for (char symbol : input.toCharArray()) {
                for (char hexDigit : HEX_DIGITS) {
                    if (symbol == hexDigit) {
                        hexDigitsCount++;
                        break;
                    }
                }
            }
            ret = hexDigitsCount == input.length();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static boolean writeFileCsv(String filePath, String[] headers, List<String[]> data) {
        boolean result = false;
        try {
            FileWriter writer = new FileWriter(filePath);
            writer.append(headers[0]);
            for (int i = 1; i < headers.length; i++) {
                String header = headers[i];
                writer.append(",");
                writer.append(header);
            }
            writer.append("\n");

            for (int i = 0; i < data.size(); i++) {
                String[] temp = data.get(i);
                for (int j = 0; j < temp.length; j++) {
                    writer.append(temp[j]);
                    if (j == temp.length - 1) {
                        writer.append("\n");
                    } else {
                        writer.append(',');
                    }
                }
            }
            writer.flush();
            writer.close();
            result = true;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return result;
    }

    public static boolean writeFileCsv(String filePath, List<String> headers, List<List<String>> data) {
        boolean result = false;
        try {
            FileWriter writer = new FileWriter(filePath);
            writer.append(headers.get(0));
            for (int i = 1; i < headers.size(); i++) {
                String header = headers.get(i);
                writer.append(",");
                writer.append(header);
            }
            writer.append("\n");

            for (int i = 0; i < data.size(); i++) {
                List<String> temp = data.get(i);
                for (int j = 0; j < temp.size(); j++) {
                    writer.append(temp.get(j));
                    if (j == temp.size() - 1) {
                        writer.append("\n");
                    } else {
                        writer.append(',');
                    }
                }
            }
            writer.flush();
            writer.close();
            result = true;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return result;
    }

    public static String executeCommand(String[] command) {
        StringBuffer sb = new StringBuffer();
        Process p = null;
        try {
            p = Runtime.getRuntime().exec(command);
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
            BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
            // read the output from the command
            String line = stdInput.readLine();
            while (line != null) {
                sb.append(line + "\n");
                line = stdInput.readLine();
            }
            // read any errors from the attempted command
            line = stdError.readLine();
            sb.append(line);
            while (line != null) {
                sb.append(line + "\n");
                line = stdError.readLine();
            }
        } catch (IOException ex) {
            sb.append(Util.convertExceptionToString(ex));
        }
        return sb.toString();
    }

    public static Object roundValue(Object value, int decimalPlaces) {
        Object ret = value;
        try {
            Double temp = Double.parseDouble(value.toString());
            if (temp != 0) {
                ret = String.format("%." + decimalPlaces + "f", temp);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public static byte[] readBytes(String filePath) {
        byte[] bFile = null;
        try {
            File file = new File(filePath);
            FileInputStream fileInputStream = null;
            bFile = new byte[(int) file.length()];
            fileInputStream = new FileInputStream(file);
            fileInputStream.read(bFile);
            fileInputStream.close();
            file.delete();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return bFile;
    }

    public static void store(String file, String message) throws FileNotFoundException, IOException {
        BufferedOutputStream bos = null;
        try {
            bos = new BufferedOutputStream(new FileOutputStream(new File(file)));
            bos.write(message.getBytes());

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (bos != null)
                try {
                    bos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
        }
    }

}
