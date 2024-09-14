package example.com.service

import com.sendgrid.Method
import com.sendgrid.Request
import com.sendgrid.SendGrid
import com.sendgrid.helpers.mail.Mail
import com.sendgrid.helpers.mail.objects.Content
import com.sendgrid.helpers.mail.objects.Email
import emailAsGreetingTemplate
import emailAsOtpTemplate
import io.github.cdimascio.dotenv.Dotenv

class EmailService {

    private val dotenv = Dotenv.configure().filename(".env").load()!!
    private val APIKEY = dotenv["SENDGRID_API_KEY"]!!
    private val FROM_EMAIL = dotenv["SENDER_EMAIL"]!!

    private val sendGrid = SendGrid(APIKEY)

    fun sendOtpAsEmail(
        toEmail: String,
        otp: String
    ): Boolean {
        val fromEmail = Email(FROM_EMAIL)
        val to = Email(toEmail)
        val subject = "Your OTP for login to MetricX"
        val htmlContent = emailAsOtpTemplate(otp)
        val otpEmailContent = Content("text/html", htmlContent)
        val mail = Mail(fromEmail, subject, to, otpEmailContent)
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

    fun sendGreetingEmail(
        toEmail: String,
        name: String
    ): Boolean {
        val fromEmail = Email(FROM_EMAIL)
        val to = Email(toEmail)
        val subject = "Welcome to MetricX"
        val htmlContent = emailAsGreetingTemplate(name)
        val greetEmailContent = Content("text/html", htmlContent)
        val mail = Mail(fromEmail, subject, to, greetEmailContent)
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
