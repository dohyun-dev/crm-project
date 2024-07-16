package com.kwon.crmproject.batch.campaign;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

import static com.kwon.crmproject.batch.campaign.CampaignCompleteBatchConfig.Constant.JOB_PARAMETERS_CUR_DATE;
import static com.kwon.crmproject.batch.campaign.CampaignCompleteBatchConfig.Constant.JOB_PARAMETERS_TIMESTAMP;

@Slf4j
@Component
@RequiredArgsConstructor
public class MeetingReminderJobScheduler {

    private final JobLauncher jobLauncher;
    private final Job meetingReminderJob;

    @Scheduled(cron = "0 0 0 * * *")
    public void runJob() throws Exception {
        LocalDate curDate = LocalDate.now();

        JobParameters jobParameters = new JobParametersBuilder()
                .addLocalDate(JOB_PARAMETERS_CUR_DATE, curDate)
                .addLong(JOB_PARAMETERS_TIMESTAMP, System.currentTimeMillis())
                .toJobParameters();

        jobLauncher.run(
                meetingReminderJob,
                jobParameters
        );
    }
}