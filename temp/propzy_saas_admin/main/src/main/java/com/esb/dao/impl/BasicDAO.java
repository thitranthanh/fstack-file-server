package com.esb.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.persistence.Table;

import org.apache.log4j.Logger;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.esb.consts.GlobalConsts;
import com.esb.dao.HibernateUtil;
import com.esb.dao.IBasicDAO;
import com.esb.util.Util;

public class BasicDAO<T, K extends Serializable> implements IBasicDAO<T, K> {

    private final static Logger log = Logger.getLogger(BasicDAO.class);

    private HibernateUtil hibernate = HibernateUtil.getInstance();

    protected Session openSession() {
        return hibernate.openSession();
    }

    protected void safeCloseSession(Session session) {
        hibernate.safeCloseSession(session);
    }

    protected final static int MAX_RECORD = GlobalConsts.MAX_RECORD;

    @SuppressWarnings("unchecked")
    protected Class<T> entityType = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
            .getActualTypeArguments()[0];

    protected String tableName = entityType.getAnnotation(Table.class).name();

    public BasicDAO() {
    }

    @Override
    public T findById(K id) {
        Session session = openSession();
        T entity = null;
        try {
            entity = (T) session.get(entityType, id);
            if (entity == null) {
                log.warn("[" + tableName + " ] ID (" + id + ") is not found");
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }
        return entity;
    }

    @Override
    public List<T> findAll(int size, String... colsRet) {
        if (size < 1) {
            size = MAX_RECORD;
        }
        List<T> list = null;
        Session session = openSession();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("select * ");
            sb.append("from ").append(tableName).append(" ");
            SQLQuery query = session.createSQLQuery(sb.toString());
            query.setCacheable(false);
            query.addEntity(entityType);
            query.setMaxResults(size);
            list = query.list();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }
        return list;
    }

    @Override
    public List<T> findAllOrderBy(int size, String orderByName, String order, String... colsRet) {
        if (size < 1) {
            size = MAX_RECORD;
        }
        List<T> list = null;
        Session session = openSession();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("select * ");
            sb.append("from ").append(tableName).append(" order by " + orderByName + " " + order);
            SQLQuery query = session.createSQLQuery(sb.toString());

            query.setCacheable(false);
            query.addEntity(entityType);
            query.setMaxResults(size);
            list = query.list();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }
        return list;
    }

    @Override
    public boolean remove(K id) {
        boolean ret = false;
        Session session = openSession();
        Transaction transaction = session.getTransaction();
        try {
            transaction.begin();
            session.delete(findById(id));
            session.flush();
            session.clear();
            transaction.commit();
            ret = true;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            transaction.rollback();
        } finally {
            this.safeCloseSession(session);
        }
        return ret;
    }

    @Override
    public boolean persist(T t) {
        boolean ret = false;
        Session session = openSession();
        Transaction transaction = session.getTransaction();
        try {
            transaction.begin();
            session.save(t);
            session.flush();
            session.clear();
            transaction.commit();
            ret = true;
        } catch (Exception ex) {
            transaction.rollback();
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }
        return ret;
    }

    @Override
    public boolean update(T t) {
        boolean ret = false;
        Session session = openSession();
        Transaction transaction = session.getTransaction();
        try {
            transaction.begin();
            session.update(t);
            session.flush();
            session.clear();
            transaction.commit();
            ret = true;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            transaction.rollback();
        } finally {
            this.safeCloseSession(session);
        }
        return ret;
    }

    @Override
    public boolean exists(K id) {
        try {
            if (id == null) {
                return false;
            }
            if (findById(id) == null) {
                return false;
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            return false;
        }

        return true;
    }

    @Override
    public List<T> findBy(String colName, Object colValue, String... colsRet) {
        List<T> list = null;
        Session session = openSession();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("select * ");
            sb.append("from ").append(tableName).append(" ");
            if (colName != null && !colName.isEmpty()) {
                sb.append("where ");
                sb.append(colName).append("=:").append(colName);
            }
            SQLQuery query = session.createSQLQuery(sb.toString());
            query.setCacheable(false);
            if (colName != null && !colName.isEmpty()) {
                query.setParameter(colName, colValue);
            }
            query.addEntity(entityType);
            list = query.list();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }

        return list;
    }

    @Override
    public T getUniqueBy(String colName, Object colValue, String... colsRet) {
        T t = null;
        Session session = openSession();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("select * ");
            sb.append("from ").append(tableName).append(" ");
            if (colName != null && !colName.isEmpty()) {
                sb.append("where ");
                sb.append(colName).append("=:").append(colName);
            }
            SQLQuery query = session.createSQLQuery(sb.toString());
            query.setCacheable(false);
            if (colName != null && !colName.isEmpty()) {
                query.setParameter(colName, colValue);
            }
            query.addEntity(entityType);
            query.setMaxResults(1);
            List<T> list = query.list();
            if (list != null && !list.isEmpty()) {
                t = list.get(0);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }

        return t;
    }

    @Override
    public List<T> findBy(Map<String, Object> cols, String... colsRet) {
        List<T> list = null;
        Session session = openSession();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("select * ");
            sb.append("from ").append(tableName).append(" ");
            if (cols != null && !cols.isEmpty()) {
                sb.append("where ");
                String andKey = " and ";
                cols.forEach((key, val) -> {
                    sb.append(key).append("=:").append(key).append(andKey);
                });
                sb.delete(sb.lastIndexOf(andKey), sb.length() - 1);
            }
            SQLQuery query = session.createSQLQuery(sb.toString());
            query.setCacheable(false);
            if (cols != null && !cols.isEmpty()) {
                cols.forEach((key, val) -> {
                    query.setParameter(key, val);
                });
            }
            query.addEntity(entityType);
            list = query.list();
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }

        return list;
    }

    @Override
    public T getUniqueBy(Map<String, Object> cols, String... colsRet) {
        T t = null;
        Session session = openSession();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("select * ");
            sb.append("from ").append(tableName).append(" ");
            if (cols != null && !cols.isEmpty()) {
                sb.append("where ");
                String andKey = " and ";
                cols.forEach((key, val) -> {
                    sb.append(key).append("=:").append(key).append(andKey);
                });
                sb.delete(sb.lastIndexOf(andKey), sb.length() - 1);
            }
            SQLQuery query = session.createSQLQuery(sb.toString());
            query.setCacheable(false);
            if (cols != null && !cols.isEmpty()) {
                cols.forEach((key, val) -> {
                    query.setParameter(key, val);
                });
            }
            query.addEntity(entityType);
            query.setMaxResults(1);
            List<T> list = query.list();
            if (list != null && !list.isEmpty()) {
                t = list.get(0);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }

        return t;
    }

    @Override
    public boolean exist(String colName, Object colValue) {
        return (getUniqueBy(colName, colValue) != null);
    }

    @Override
    public boolean exist(Map<String, Object> cols) {
        return (getUniqueBy(cols) != null);
    }

    @Override
    public boolean update(Map<String, Object> cols, String pk, Object val) {
        boolean ret = false;
        if (cols == null || cols.isEmpty() || pk == null || pk.isEmpty() || val == null) {
            return ret;
        }
        Session session = openSession();
        Transaction trxn = session.beginTransaction();
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("update ").append(tableName).append(" ");
            sb.append("set ");
            cols.forEach((k, v) -> {
                sb.append(k).append("=:").append(k).append(",");
            });

            sb.deleteCharAt(sb.length() - 1);
            sb.append(" ");
            sb.append("where ");
            sb.append(pk).append("=:").append(pk);
            SQLQuery query = session.createSQLQuery(sb.toString());
            query.setCacheable(false);
            if (cols != null && !cols.isEmpty()) {
                cols.forEach((k, v) -> {
                    query.setParameter(k, v);
                });
            }
            query.setParameter(pk, val);
            query.executeUpdate();
            session.flush();
            session.clear();
            trxn.commit();
            ret = true;
        } catch (Exception ex) {
            trxn.rollback();
            log.error(Util.convertExceptionToString(ex));
        } finally {
            this.safeCloseSession(session);
        }

        return ret;
    }

    @Override
    public int count() {
        int count = 0;
        Session session = openSession();
        try {
            SQLQuery query = session.createSQLQuery("select count(1) from `" + tableName + "`");
            query.setCacheable(false);
            count = ((BigDecimal) query.uniqueResult()).intValue();
        } catch (Exception e) {
            log.error(Util.convertExceptionToString(e));
        } finally {
            safeCloseSession(session);
        }
        return count;
    }

}
