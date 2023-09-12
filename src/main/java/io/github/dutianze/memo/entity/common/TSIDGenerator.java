package io.github.dutianze.memo.entity.common;

import io.hypersistence.tsid.TSID;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

/**
 * @author dutianze
 * @date 2023/9/12
 */
public class TSIDGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        return TSID.Factory.getTsid().toString();
    }
}
