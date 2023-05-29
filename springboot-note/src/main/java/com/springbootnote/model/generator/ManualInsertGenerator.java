package com.springbootnote.model.generator;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IncrementGenerator;

import java.io.Serializable;

public class ManualInsertGenerator extends IncrementGenerator {

    // extend IncrementGenerator of ORM 6.0
    @Override
    public Serializable generate(SharedSessionContractImplementor session,
                                 Object object) throws HibernateException {
        Serializable id = (Serializable) session.getEntityPersister(object.getClass().getName(), object)
                .getIdentifierMapping().getIdentifier(object);
        return id != null ? id : (Serializable) super.generate(session, object);

    }

}
