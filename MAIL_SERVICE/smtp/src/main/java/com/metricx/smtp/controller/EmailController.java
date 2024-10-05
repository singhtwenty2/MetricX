package com.metricx.smtp.controller;

import com.metricx.smtp.model.GreetingEmailRequest;
import com.metricx.smtp.service.EmailService;
import com.metricx.smtp.service.EmailServiceImpl;
import com.metricx.smtp.model.OtpEmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(
            @RequestBody OtpEmailRequest otpEmailRequest
    ) {
        boolean isEmailSent = emailService.sendOtpAsEmail(otpEmailRequest);
        if (isEmailSent) {
            return new ResponseEntity<>("OTP sent successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to send OTP", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/send-greetings")
    public ResponseEntity<String> sendGreetings(
            @RequestBody GreetingEmailRequest greetingEmailRequest
    ) {
        boolean isEmailSent = emailService.sendGreetingsAsEmail(greetingEmailRequest);
        if (isEmailSent) {
            return new ResponseEntity<>("Greetings sent successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to send greetings", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
