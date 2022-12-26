package com.springbootcourse.model.generator;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.id.IdentityGenerator;

import java.io.Serializable;

public class ManualInsertGenerator extends IdentityGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session,
                                 Object object) throws HibernateException {
//        Serializable id = (Serializable) session.getEntityPersister(object.getClass().getName(), object)
//                .getEntityMetamodel().getIdentifierProperty();
        Serializable id = (Serializable) session.getEntityPersister(null, object)
                .getClassMetadata().getIdentifier(object, session);
        return id != null ? id : (Serializable) super.generate(session, object);
//        if (id != null && Integer.parseInt(id.toString()) > 0) {
//            return id;
//        }
//        else {
//            return (Serializable) super.generate(session, object);
//        }

    }



}
