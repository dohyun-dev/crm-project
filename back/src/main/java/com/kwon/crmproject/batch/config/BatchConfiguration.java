package com.kwon.crmproject.batch.config;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.repository.support.JobRepositoryFactoryBean;
import org.springframework.batch.item.database.support.DataFieldMaxValueIncrementerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.support.incrementer.DataFieldMaxValueIncrementer;
import org.springframework.jdbc.support.incrementer.MySQLMaxValueIncrementer;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableBatchProcessing
@RequiredArgsConstructor
@Profile("prod")
public class BatchConfiguration extends DefaultBatchConfiguration {

    private final DataSource dataSource;
    private final PlatformTransactionManager transactionManager;

    @Override
    public JobRepository jobRepository() {
        JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
        factory.setDataSource(dataSource);
        factory.setTransactionManager(transactionManager);
        factory.setIncrementerFactory(dataFieldMaxValueIncrementerFactory());
        factory.setDatabaseType("MYSQL");
        try {
            factory.afterPropertiesSet();
            return factory.getObject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException();
        }

    }

    @Bean
    public DataFieldMaxValueIncrementer jobInstanceIncrementer() {
        return new MySQLMaxValueIncrementer(dataSource, "BATCH_JOB_SEQ", "ID");
    }

    @Bean
    public DataFieldMaxValueIncrementer jobExecutionIncrementer() {
        return new MySQLMaxValueIncrementer(dataSource, "BATCH_JOB_EXECUTION_SEQ", "ID");
    }

    @Bean
    public DataFieldMaxValueIncrementer stepExecutionIncrementer() {
        return new MySQLMaxValueIncrementer(dataSource, "BATCH_STEP_EXECUTION_SEQ", "ID");
    }

    @Bean
    public DataFieldMaxValueIncrementerFactory dataFieldMaxValueIncrementerFactory() {
        return new DataFieldMaxValueIncrementerFactory() {
            @Override
            public DataFieldMaxValueIncrementer getIncrementer(String incrementerType, String incrementerName) {
                switch (incrementerName) {
                    case "BATCH_JOB_SEQ":
                        return jobInstanceIncrementer();
                    case "BATCH_JOB_EXECUTION_SEQ":
                        return jobExecutionIncrementer();
                    case "BATCH_STEP_EXECUTION_SEQ":
                        return stepExecutionIncrementer();
                    default:
                        throw new IllegalArgumentException("Unknown incrementer name: " + incrementerName);
                }
            }

            @Override
            public boolean isSupportedIncrementerType(String databaseType) {
                return "MYSQL".equalsIgnoreCase(databaseType);
            }

            @Override
            public String[] getSupportedIncrementerTypes() {
                return new String[] {"MYSQL"};
            }
        };
    }
}
