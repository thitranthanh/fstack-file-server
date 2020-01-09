package com.esb.util;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import com.esb.entity.config.Property;

/**
 * Methods of the file properties
 * 
 * @author thi.tt
 */
public class PropertiesUtil {

    private ArrayList<Property> als = new ArrayList<Property>();
    private String file = "";
    private final String SPLIT = "=";
    private final String COMMENT = "#";
    private final int COMMENT_SIZE = COMMENT.length();
    private final String ENTER = "\n";

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    /**
     * Constructor method (without filename)
     * 
     * @throws IOException
     * @throws FileNotFoundException
     */
    public PropertiesUtil() throws FileNotFoundException, IOException {
        read();
    }

    /**
     * Constructor method (within file name)
     * 
     * @param fileName
     * @throws IOException
     * @throws FileNotFoundException
     */
    public PropertiesUtil(String fileName) throws FileNotFoundException, IOException {
        this.file = fileName;
        read(this.file);
    }

    /**
     * Read file properties to ArrayList with file description
     * 
     * @param file
     */
    private synchronized void read(String file) throws FileNotFoundException, IOException {

        als = new ArrayList<Property>();

        this.file = file;

        BufferedReader in = null;
        try {
            in = new BufferedReader(new FileReader(file));
            String temp = "";

            while ((temp = in.readLine()) != null) {

                StringBuffer key = new StringBuffer();
                StringBuffer value = new StringBuffer();

                String[] arrTemp = temp.split(SPLIT);
                long len = arrTemp.length;

                if (len == 1) {
                    key.append(arrTemp[0]);
                } else if (len == 2) {
                    key.append(arrTemp[0]);
                    value.append(arrTemp[1]);
                } else {
                    key.append(arrTemp[0]);
                    for (int i = 1; i < len; i++)
                        value.append(arrTemp[i].trim());
                }

                Property p = new Property();
                p.setKey(key.toString().trim());
                p.setValue(value.toString().trim());

                if (temp.contains(SPLIT))
                    p.setSplit(SPLIT);

                als.add(p);
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
        }
    }

    /**
     * Read file properties to ArrayList
     */
    private synchronized void read() throws FileNotFoundException, IOException {

        read(this.file);

        // als = new ArrayList<Property>();
        //
        // BufferedReader in = null;
        // try {
        // in = new BufferedReader(new FileReader(file));
        // String temp = "";
        //
        // while ((temp = in.readLine()) != null) {
        //
        // StringBuffer key = new StringBuffer();
        // StringBuffer value = new StringBuffer();
        //
        // String[] arrTemp = temp.split(SPLIT);
        // long len = arrTemp.length;
        //
        // if (len == 1) {
        // key.append(arrTemp[0]);
        // } else if (len == 2) {
        // key.append(arrTemp[0]);
        // value.append(arrTemp[1]);
        // } else {
        // key.append(arrTemp[0]);
        // for (int i = 1; i < len; i++)
        // value.append(arrTemp[i].trim());
        // }
        //
        // Property p = new Property();
        // p.setKey(key.toString().trim());
        // p.setValue(value.toString().trim());
        //
        // if (temp.contains(SPLIT))
        // p.setSplit(SPLIT);
        //
        // als.add(p);
        // }
        // } catch (FileNotFoundException e) {
        // throw new RuntimeException(e);
        // } catch (IOException e) {
        // throw new RuntimeException(e);
        // } finally {
        // if (in != null)
        // try {
        // in.close();
        // } catch (IOException e) {
        // throw new RuntimeException(e);
        // }
        // }
    }

    /**
     * Set value
     * 
     * @param key
     * @param value
     */
    /*
     * Not use public synchronized void set(String key, String value) {
     * if(key!=null){ long size = als.size(); int i = 0; key = key.trim();
     * if(value==null) value=""; else value = value.trim(); Property p = new
     * Property(); for (; i < size; i++) { p = als.get(i); if
     * (p.getKey().equals(key)) { p.setValue(value); als.remove(i); als.add(i, p);
     * break; } } } }
     */

    /**
     * Get value by key
     * 
     * @param key
     * @return
     */
    public synchronized String getString(String key) {
        String rs = "";
        if (key != null) {

            long size = als.size();
            key = key.trim();
            Property p = new Property();
            for (int i = 0; i < size; i++) {
                p = als.get(i);
                if (p.getKey().equals(key)) {
                    rs = p.getValue();
                    break;
                }
            }
        }

        return rs;
    }

    /**
     * get integer value by key
     * 
     * @param key
     * @return
     */
    public synchronized int getInteger(String key) throws NumberFormatException {
        if (null == key || key.isEmpty())
            throw new RuntimeException("The key cannot be null or empty");
        try {
            return Integer.parseInt(getString(key));
        } catch (NumberFormatException ex) {
            throw new RuntimeException("Error: " + getString(key) + " is not valid integer value");
        }

    }

    /**
     * get integer value by key
     * 
     * @param key
     * @return
     */
    public synchronized boolean getBoolean(String key) throws NumberFormatException {
        if (null == key || key.isEmpty())
            throw new RuntimeException("The key cannot be null or empty");
        try {
            return Boolean.parseBoolean(getString(key));
        } catch (NumberFormatException ex) {
            throw new RuntimeException("Error: " + getString(key) + " is not valid integer value");
        }

    }

    /**
     * Add (key,value) into ArrayList
     * 
     * @param key
     * @param value
     * @throws IOException
     * @throws FileNotFoundException
     */
    public synchronized void set(String key, String value) throws FileNotFoundException, IOException {

        if (key != null) {
            long size = als.size();
            key = key.trim();

            if (value == null)
                value = "";
            else
                value = value.trim();

            Property p = new Property();
            boolean b = false;
            for (int i = 0; i < size; i++) {
                p = als.get(i);

                if (p.getKey().equals(key)) {
                    b = true;
                    break;
                }
            }

            if (b) {
                p.setValue(value);
            } else {
                p = new Property();
                p.setKey(key);
                p.setSplit(SPLIT);
                p.setValue(value);
                als.add(p);
            }
            store();
        }

    }

    /**
     * Remove (key) in ArrayList
     * 
     * @param key
     * @throws IOException
     * @throws FileNotFoundException
     */
    public synchronized void remove(String key) throws FileNotFoundException, IOException {

        if (key != null) {

            long size = als.size();
            key = key.trim();

            Property p = new Property();
            boolean b = false;
            for (int i = 0; i < size; i++) {
                p = als.get(i);
                if (p.getKey().equals(key)) {
                    b = true;
                    break;
                }
            }

            if (b) {
                als.remove(p);
            }

            store();
        }
    }

    /**
     * Get All <key,value>
     * 
     * @return
     */
    public synchronized ArrayList<Property> getAllKeys() {
        ArrayList<Property> rs = new ArrayList<Property>();
        long size = als.size();
        Property p = new Property();
        for (int i = 0; i < size; i++) {
            p = als.get(i);
            if (p.getValue() != null && !"".equals(p.getValue())
                    && !COMMENT.equals(p.getKey().trim().substring(0, COMMENT_SIZE)))
                rs.add(p);
        }
        return rs;
    }

    /**
     * Store ArrayList to new file
     * 
     * @param newFile
     */
    public synchronized void saveAs(String newFile) throws FileNotFoundException, IOException {
        BufferedOutputStream bos = null;
        try {

            if (als.get(0).getKey().substring(0, 1).equals(COMMENT))
                als.remove(0);

            Property p = new Property();
            p.setKey(COMMENT + new Date());

            als.add(0, p);

            bos = new BufferedOutputStream(new FileOutputStream(new File(newFile)));

            StringBuffer sb = new StringBuffer();

            for (Property property : als) {

                String temp = property.getKey();
                if (!"".equals(temp))
                    sb.append(temp);

                temp = property.getSplit();
                if (!"".equals(temp))
                    sb.append(temp);

                temp = property.getValue();
                if (!"".equals(temp))
                    sb.append(temp);

                sb.append(ENTER);

            }

            bos.write(sb.toString().getBytes());

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

    /**
     * Store ArrayList to old file
     */
    private synchronized void store() throws FileNotFoundException, IOException {

        BufferedOutputStream bos = null;
        try {

            if (als.get(0).getKey().substring(0, 1).equals(COMMENT))
                als.remove(0);

            Property p = new Property();
            p.setKey(COMMENT + new Date());

            als.add(0, p);

            bos = new BufferedOutputStream(new FileOutputStream(new File(file)));

            StringBuffer sb = new StringBuffer();

            for (Property property : als) {

                String temp = property.getKey();
                if (!"".equals(temp))
                    sb.append(temp);

                temp = property.getSplit();
                if (!"".equals(temp))
                    sb.append(temp);

                temp = property.getValue();
                if (!"".equals(temp))
                    sb.append(temp);

                sb.append(ENTER);

            }

            bos.write(sb.toString().getBytes());

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
