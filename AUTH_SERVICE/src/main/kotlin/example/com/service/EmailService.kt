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
        val subject = "Your OTP for login To MetricX."
        val content = Content("text/plain", "Your OTP is $otp")
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