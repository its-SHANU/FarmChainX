package com.farmchainx.farmchainx.config;

import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public Hibernate6Module hibernate6Module() {
        // Lets Jackson unwrap Hibernate lazy proxies (e.g. Product.farmer) instead of
        // failing with "Type definition error: ... ByteBuddyInterceptor"
        Hibernate6Module module = new Hibernate6Module();
        module.disable(Hibernate6Module.Feature.USE_TRANSIENT_ANNOTATION);
        return module;
    }
}
