package com.metricx.smtp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpEmailRequest {
    private String receiverEmail;
    private String subject;
    private String otp;
}
