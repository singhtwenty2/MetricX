package com.metricx.smtp.service;

import com.metricx.smtp.model.GreetingEmailRequest;
import com.metricx.smtp.model.OtpEmailRequest;

public interface EmailService {

    boolean sendOtpAsEmail(OtpEmailRequest otpEmailRequest);

    boolean sendGreetingsAsEmail(GreetingEmailRequest greetingEmailRequest);
}
