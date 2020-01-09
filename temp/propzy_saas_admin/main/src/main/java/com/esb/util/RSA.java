package com.esb.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.EncodedKeySpec;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

/**
 * RSA utilities
 * 
 * @author thitranthanh@gmail.com
 * @date May 20, 2013
 * 
 * 
 */
public class RSA {

    public static String encrypt(String dataSent, String publicKeyFilePath)
            throws IOException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
            IllegalBlockSizeException, BadPaddingException {

        PrivateKey pubKey = readPrivateKey(publicKeyFilePath);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(1, pubKey);
        byte[] cipherData = cipher.doFinal(stringToByte(dataSent));
        return Base64.encode(cipherData);
    }

    public static String decrypt(String dataReceived, String publicKeyFilePath) throws NoSuchAlgorithmException,
            NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        try {
            PublicKey pubKey = readPublicKey(publicKeyFilePath);
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(2, pubKey);
            byte[] data = cipher.doFinal(Base64.decode(dataReceived));
            return byteToString(data);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Read public key file
     * 
     * @param keyFileName
     * @return
     * @throws IOException
     */
    public static PublicKey readPublicKey(String keyFileName) throws IOException {

        ObjectInputStream oin = new ObjectInputStream(new BufferedInputStream(new FileInputStream(keyFileName)));
        try {
            BigInteger m = (BigInteger) oin.readObject();
            BigInteger e = (BigInteger) oin.readObject();
            RSAPublicKeySpec keySpec = new RSAPublicKeySpec(m, e);
            KeyFactory fact = KeyFactory.getInstance("RSA");
            PublicKey pubKey = fact.generatePublic(keySpec);
            return pubKey;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            oin.close();
        }
    }

    /**
     * Read private key file
     * 
     * @param keyFileName
     * @return
     * @throws IOException
     */
    public static PrivateKey readPrivateKey(String keyFileName) throws IOException {

        ObjectInputStream oin = new ObjectInputStream(new BufferedInputStream(new FileInputStream(keyFileName)));
        try {
            BigInteger m = (BigInteger) oin.readObject();
            BigInteger e = (BigInteger) oin.readObject();
            RSAPrivateKeySpec keySpec = new RSAPrivateKeySpec(m, e);
            KeyFactory fact = KeyFactory.getInstance("RSA");
            PrivateKey privKey = fact.generatePrivate(keySpec);
            return privKey;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            oin.close();
        }
    }

    /**
     * 
     * @param keyFileName
     * @return
     * @throws IOException
     */
    public static PublicKey readPublicKey(File keyFileName) throws IOException {
        try {
            byte[] publickeyBytes = Base64.decode(new String(readKeyBytesFromFile(keyFileName)));
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(publickeyBytes);
            PublicKey pubKey = keyFactory.generatePublic(publicKeySpec);
            return pubKey;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
        return null;
    }

    private static String byteToString(byte[] data) throws UnsupportedEncodingException {
        String result = new String(data, "UTF8");
        return result;
    }

    private static byte[] stringToByte(String data) throws UnsupportedEncodingException {
        byte[] stringbytes = data.getBytes("UTF8");
        return stringbytes;
    }

    @SuppressWarnings("resource")
    private static byte[] readKeyBytesFromFile(File file) throws IOException {
        InputStream is = new FileInputStream(file);

        long length = file.length();

        if (length > 2147483647L)
            ;
        byte[] bytes = new byte[(int) length];

        int offset = 0;
        int numRead = 0;
        while (offset < bytes.length) {
            if ((numRead = is.read(bytes, offset, bytes.length - offset)) < 0)
                break;
            offset += numRead;
        }

        if (offset < bytes.length) {
            throw new IOException("Key File Error: Could not completely read file " + file.getName());
        }

        is.close();
        return bytes;
    }

}
