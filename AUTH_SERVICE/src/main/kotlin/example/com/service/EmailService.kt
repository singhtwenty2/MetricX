package example.com.service

import example.com.data.dto.remote.GreetingEmailRequest
import example.com.data.dto.remote.OtpEmailRequest
import io.github.cdimascio.dotenv.Dotenv
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import io.ktor.util.InternalAPI
import kotlinx.serialization.json.Json

@OptIn(InternalAPI::class)
class EmailService {

    private val dotenv = Dotenv.configure().filename(".env").load()!!
    private val SPRING_EMAIL_SERVER = dotenv["SPRING_EMAIL_SERVER"]!!

    private val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                prettyPrint = true
                isLenient = true
                ignoreUnknownKeys = true
            })
        }
    }

    suspend fun sendOtpAsEmail(
        receiverEmail: String, otp: String
    ): Boolean {
        try {
            val response: HttpResponse = client.post("$SPRING_EMAIL_SERVER/email/send-otp") {
                contentType(ContentType.Application.Json)
                setBody(
                    OtpEmailRequest(
                        receiverEmail = receiverEmail, subject = "OTP for your account", otp = otp
                    )
                )
            }
            return response.status.value == 200
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        }
    }

    suspend fun sendGreetingEmail(
        toEmail: String, name: String
    ): Boolean {
        try {
            val response: HttpResponse = client.post("$SPRING_EMAIL_SERVER/email/send-greetings") {
                contentType(ContentType.Application.Json)
                setBody(
                    GreetingEmailRequest(
                        receiverEmail = toEmail, subject = "Greetings from MetricX.", name = name
                    )
                )
            }
            return response.status.value == 200
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        }
    }
}