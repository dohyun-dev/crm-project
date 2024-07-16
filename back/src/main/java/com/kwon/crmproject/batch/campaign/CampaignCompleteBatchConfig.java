package com.kwon.crmproject.batch.campaign;

import com.kwon.crmproject.campaign.domain.entity.Campaign;
import com.kwon.crmproject.campaign.domain.entity.CampaignState;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CampaignCompleteBatchConfig {

    private final JobRepository jobRepository;
    private final JpaTransactionManager transactionManager;
    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public Job campaignCompleteJob() {
        return new JobBuilder(Constant.JOB_NAME, jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(meetingReminderStep())
                .build();
    }

    @Bean
    @JobScope
    public Step meetingReminderStep() {
        return new StepBuilder(Constant.STEP_NAME, jobRepository)
                .<Campaign, Campaign>chunk(Constant.CHUNK_SIZE, transactionManager)
                .reader(itemReader(null))
                .processor(itemProcessor())
                .writer(itemWriter())
                .build();
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<Campaign> itemReader(
            @Value("#{jobParameters[curDate]}") LocalDate curDate
    ) {
        log.info("curDate={}", curDate);

        curDate = ObjectUtils.isEmpty(curDate) ? LocalDate.now() : curDate;

        return new JpaPagingItemReaderBuilder<Campaign>()
                .name(Constant.ITEM_READER_NAME)
                .entityManagerFactory(entityManagerFactory)
                .pageSize(Constant.CHUNK_SIZE)
                .queryString(Constant.JPA_QUERY)
                .parameterValues(
                        Map.of(
                                Constant.JPA_QUERY_PARAM_STATE, CampaignState.IN_PROGRESS,
                                Constant.JPA_QUERY_PARAM_DATE, curDate
                        )
                )
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<Campaign, Campaign> itemProcessor() {
        return campaign -> {
            campaign.completeCampaign();
            return campaign;
        };
    }

    // 아이템 라이터
    @Bean
    @StepScope
    public ItemWriter<Campaign> itemWriter() {
        JpaItemWriter<Campaign> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(entityManagerFactory);
        return jpaItemWriter;
    }

    public static class Constant {
        public static final String JOB_NAME = "campaignCompleteJob";
        public static final String STEP_NAME = "campaignCompleteStep";
        public static final String ITEM_READER_NAME = "campaignCompleteItemReader";
        public static final int CHUNK_SIZE = 10;

        public static final String JPA_QUERY = """
                SELECT c FROM Campaign c
                WHERE 
                    c.state = :state 
                    AND 
                    c.endDate <= :date
                """;

        public static final String JPA_QUERY_PARAM_STATE = "state";
        public static final String JPA_QUERY_PARAM_DATE = "date";

        public static final String JOB_PARAMETERS_CUR_DATE = "curDate";
        public static final String JOB_PARAMETERS_TIMESTAMP = "timestamp";
    }
}
