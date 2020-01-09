package com.esb.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface IBasicDAO<T, K extends Serializable> {

    T findById(K id);

    List<T> findAll(int size, String... colsRet);

    List<T> findAllOrderBy(int size, String orderByName, String order, String... colsRet);

    boolean remove(K id);

    boolean persist(T t);

    boolean update(T t);

    boolean exists(K id);

    List<T> findBy(String colName, Object colValue, String... colsRet);

    T getUniqueBy(String colName, Object colValue, String... colsRet);

    List<T> findBy(Map<String, Object> cols, String... colsRet);

    T getUniqueBy(Map<String, Object> cols, String... colsRet);

    boolean exist(String colName, Object colValue);

    boolean exist(Map<String, Object> cols);

    boolean update(Map<String, Object> cols, String pk, Object val);

    int count();

}
