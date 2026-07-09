package com.farmchainx.farmchainx.config;

import com.farmchainx.farmchainx.model.*;
import com.farmchainx.farmchainx.service.SequenceGeneratorService;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertCallback;
import org.springframework.stereotype.Component;

@Component
public class MongoIdCallback implements BeforeConvertCallback<Object> {

    private final SequenceGeneratorService sequenceGenerator;

    public MongoIdCallback(@Lazy SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public Object onBeforeConvert(Object entity, String collection) {
        if (entity instanceof User u && u.getId() == null) {
            u.setId(sequenceGenerator.generateSequence(User.class.getSimpleName() + "_sequence"));
        } else if (entity instanceof Product p && p.getId() == null) {
            p.setId(sequenceGenerator.generateSequence(Product.class.getSimpleName() + "_sequence"));
        } else if (entity instanceof Purchase pu && pu.getId() == null) {
            pu.setId(sequenceGenerator.generateSequence(Purchase.class.getSimpleName() + "_sequence"));
        } else if (entity instanceof Rating r && r.getId() == null) {
            r.setId(sequenceGenerator.generateSequence(Rating.class.getSimpleName() + "_sequence"));
        } else if (entity instanceof Activity a && a.getId() == null) {
            a.setId(sequenceGenerator.generateSequence(Activity.class.getSimpleName() + "_sequence"));
        }
        return entity;
    }
}
