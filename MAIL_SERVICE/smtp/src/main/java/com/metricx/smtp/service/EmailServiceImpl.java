package com.metricx.smtp.service;

import com.metricx.smtp.model.GreetingEmailRequest;
import com.metricx.smtp.model.OtpEmailRequest;
import com.metricx.smtp.util.MailTemplate;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public boolean sendOtpAsEmail(OtpEmailRequest otpEmailRequest) {
        MimeMessage mimeMailMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMailMessage, true);
            helper.setTo(otpEmailRequest.getReceiverEmail());
            helper.setSubject(otpEmailRequest.getSubject());
            String htmlContent = MailTemplate.otpMailHtmlContent(otpEmailRequest.getOtp());
            helper.setText(htmlContent, true);
            mailSender.send(mimeMailMessage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean sendGreetingsAsEmail(GreetingEmailRequest greetingEmailRequest) {
        MimeMessage mimeMailMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMailMessage, true);
            helper.setTo(greetingEmailRequest.getReceiverEmail());
            helper.setSubject(greetingEmailRequest.getSubject());
            String htmlContent = MailTemplate.greetingMailHtmlContent(greetingEmailRequest.getName());
            helper.setText(htmlContent, true);
            mailSender.send(mimeMailMessage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
