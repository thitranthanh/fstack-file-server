package com.esb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.esb.consts.GlobalConsts;

@Entity
@Table(name = GlobalConsts.TABLE_GROUP)
public class Group {

    public static final transient String ID = "id";
    public static final transient String NAME = "name";
    public static final transient String DESCRIPTION = "description";

    @Id
    @Column(name = ID)
    private String id;

    @Column(name = NAME)
    private String name;

    @Column(name = DESCRIPTION)
    private String description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
