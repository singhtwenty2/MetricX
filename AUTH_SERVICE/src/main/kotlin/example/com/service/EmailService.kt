package example.com.service

import com.sendgrid.Method
import com.sendgrid.Request
import com.sendgrid.SendGrid
import com.sendgrid.helpers.mail.Mail
import com.sendgrid.helpers.mail.objects.Content
import com.sendgrid.helpers.mail.objects.Email

class EmailService {

    private val APIKEY = System.getenv("SENDGRID_API_KEY")
    private val FROM_EMAIL = System.getenv("SENDER_EMAIL")

    private val sendGrid = SendGrid(APIKEY)

    fun sendOtpAsEmail(
        toEmail: String,
        otp: String
    ): Boolean {
        val fromEmail = Email(FROM_EMAIL)
        val to = Email(toEmail)
        val subject = "Your OTP for login to MetricX"
        val htmlContent = """<html>
<head>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f2f2f5;
            color: #1a1a1b;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 60px 20px;
            text-align: center;
        }
        .content {
            background-color: #ffffff;
            border-radius: 16px;
            padding: 70px 60px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border: 1px solid #dedede;
        }
        .header {
            font-size: 34px;
            font-weight: 700;
            color: #0070e0;
            margin-bottom: 40px;
            letter-spacing: -0.02em;
            text-transform: capitalize;
        }
        p {
            font-size: 17px;
            line-height: 1.8;
            color: #4a4a4e;
            margin: 0 0 25px;
        }
        .otp {
            font-size: 42px;
            font-weight: 700;
            color: #1b1b1d;
            margin: 50px 0;
            letter-spacing: 6px;
        }
        .notice {
            font-size: 16px;
            color: #3b3b3e;
            margin-top: 40px;
            line-height: 1.6;
        }
        .disclaimer {
            font-size: 15px;
            color: #666671;
            font-style: italic;
            margin-top: 50px;
            line-height: 1.5;
        }
        .footer {
            font-size: 13px;
            color: #7e7e82;
            margin-top: 60px;
            border-top: 1px solid #ececec;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="header">Your OTP for MetricX</div>
            <p>Dear User,</p>
            <p>Please use the following One-Time Password (OTP) to securely log in to your account:</p>
            <div class="otp">$otp</div>
            <p>This OTP is valid for the next 10 minutes. If you didn’t request this, please ignore this message.</p>
            <p class="notice">
                For your safety, do not share this OTP with anyone. If you suspect unauthorized access, please contact our support team immediately.
            </p>
            <p class="disclaimer">
                Please note: We will never ask for your OTP via email, phone, or any other communication method.
            </p>
            <div class="footer">
                &copy; 2024 MetricX. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
""".trimIndent()

        val content = Content("text/html", htmlContent)
        val mail = Mail(fromEmail, subject, to, content)
        val request = Request()
        request.method = Method.POST
        request.endpoint = "mail/send"
        request.body = mail.build()

        return try {
            sendGrid.api(request)
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
}
