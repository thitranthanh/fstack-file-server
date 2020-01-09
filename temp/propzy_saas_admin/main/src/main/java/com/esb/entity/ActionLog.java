package com.esb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.esb.consts.GlobalConsts;

@Entity
@Table(name = GlobalConsts.TABLE_ACTION_LOG)
public class ActionLog {

    public final static transient String ID = "id";
    public final static transient String TIMESTAMP = "timestamp";
    public final static transient String ACTION = "action";
    public final static transient String USERNAME = "username";
    public final static transient String STATUS = "status";
    public final static transient String COMMENT = "comment";
    public final static transient String FUNCTION = "function";
    public final static transient String INPUT = "input";
    public final static transient String OUTPUT = "output";

    @Id
    @Column(name = ID)
    private String id;

    @Column(name = TIMESTAMP)
    private Long timestamp;

    @Column(name = ACTION)
    private String action;

    @Column(name = USERNAME)
    private String username;

    @Column(name = STATUS)
    private String status;

    @Column(name = COMMENT)
    private String comment;

    @Column(name = FUNCTION)
    private String function;

    @Column(name = INPUT)
    private String input;

    @Column(name = OUTPUT)
    private String output;

    private String strDateTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getStrDateTime() {
        return strDateTime;
    }

    public void setStrDateTime(String strDateTime) {
        this.strDateTime = strDateTime;
    }

}
