package com.esb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.esb.consts.GlobalConsts;

@Entity
@Table(name = GlobalConsts.TABLE_USER)
public class User {

    public static final transient String ID = "id";
    public static final transient String FULLNAME = "full_name";
    public static final transient String GENDER = "gender";
    public static final transient String CONTACT_NUMBER = "contact_number";
    public static final transient String EMAIL_ADDRESS = "email_address";
    public static final transient String USERNAME = "username";
    public static final transient String PASSWORD = "password";
    public static final transient String LAST_UPDATED = "last_updated";
    public static final transient String LAST_SIGNED_IN = "last_signed_in";
    public static final transient String CREATED_DATE = "created_date";
    public static final transient String USER_STATUS = "status";

    @Id
    @Column(name = ID)
    private String id;

    @Column(name = FULLNAME)
    private String fullName;

    @Column(name = GENDER)
    private String gender;

    @Column(name = CONTACT_NUMBER)
    private String contactNumber;

    @Column(name = EMAIL_ADDRESS)
    private String emailAddress;

    @Column(name = USERNAME)
    private String username;

    @Column(name = PASSWORD)
    private String password;

    @Column(name = LAST_UPDATED)
    private Long lastUpdated;

    @Column(name = LAST_SIGNED_IN)
    private Long lastSignedIn;

    @Column(name = CREATED_DATE)
    private Long createdDate;

    @Column(name = USER_STATUS)
    private String status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Long getLastSignedIn() {
        return lastSignedIn;
    }

    public void setLastSignedIn(Long lastSignedIn) {
        this.lastSignedIn = lastSignedIn;
    }

    public Long getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Long createdDate) {
        this.createdDate = createdDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis());
    }
}
