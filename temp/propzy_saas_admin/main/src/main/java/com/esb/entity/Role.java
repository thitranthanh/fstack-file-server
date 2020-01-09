package com.esb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.esb.consts.GlobalConsts;

@Entity
@Table(name = GlobalConsts.TABLE_ROLE)
public class Role {

    public static final transient String ID = "id";
    public static final transient String NAME = "name";

    @Id
    @Column(name = ID)
    private String id;

    @Column(name = NAME)
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}