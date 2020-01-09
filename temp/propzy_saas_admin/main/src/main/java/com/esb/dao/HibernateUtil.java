package com.esb.dao;

import java.util.Set;

import org.apache.log4j.Logger;
import org.hibernate.CacheMode;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.reflections.Reflections;

import com.esb.util.Util;

public class HibernateUtil {

    private static final Logger log = Logger.getLogger(HibernateUtil.class);

    private static HibernateUtil instance = null;

    private static SessionFactory sessionFactory = buildSessionFactory();

    private HibernateUtil() {
    }

    public static HibernateUtil getInstance() {
        try {
            if (instance == null) {
                instance = new HibernateUtil();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return instance;
    }

    public static SessionFactory buildSessionFactory() {
        SessionFactory sessionFactory = null;
        Configuration configuration = new Configuration().configure("hibernate.cfg.xml");
        Reflections reflections = new Reflections("com.esb.entity");
        Set<Class<?>> classes = reflections.getTypesAnnotatedWith(javax.persistence.Entity.class);
        for (Class<?> clazz : classes) {
            log.debug(clazz.getName());
            // System.out.println(clazz.getName());
            configuration.addAnnotatedClass(clazz);
        }

        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                .applySettings(configuration.getProperties()).build();
        sessionFactory = configuration.buildSessionFactory(serviceRegistry);
        log.info("Hibernate just has been started up successfully");
        // System.out.println("Hibernate just has been started up successfully");
        return sessionFactory;
    }

    public void closeSessionFacotry() {
        if (!sessionFactory.isClosed()) {
            sessionFactory.close();
        }
    }

    /* sets and gets method */

    public void safeCloseSession(Session session) {
        if (session != null) {
            session.close();
        }
    }

    public Session openSession() {
        Session session = sessionFactory.openSession();
        session.clear();
        session.flush();
        session.setCacheMode(CacheMode.REFRESH);
        return session;
    }

    public Session currentSession() {
        return sessionFactory.getCurrentSession();
    }

}
