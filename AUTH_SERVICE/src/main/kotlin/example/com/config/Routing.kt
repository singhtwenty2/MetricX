package example.com.config

import example.com.controller.AuthController
import example.com.controller.KycController
import example.com.data.dto.response.MessageDTO
import example.com.data.repository.dao.KycDAO
import example.com.data.repository.dao.OtpDAO
import example.com.data.repository.dao.TokenDAO
import example.com.data.repository.dao.UserDAO
import example.com.routing.authRoutes
import example.com.routing.kycRoutes
import example.com.security.hashing.SHA256HashingService
import example.com.security.token.JwtConfig
import example.com.service.EmailService
import example.com.service.KycService
import example.com.service.OtpService
import example.com.service.UserService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause", status = HttpStatusCode.InternalServerError)
        }
    }
    val hashingService = SHA256HashingService()
    val userDao = UserDAO(hashingService)
    val token = JwtConfig
    val emailService = EmailService()
    val otpDAO = OtpDAO
    val tokenDao = TokenDAO
    val otpService = OtpService(emailService, otpDAO)
    val kycDao = KycDAO
    val kycService = KycService(kycDao, userDao)
    val kycController = KycController(kycService, emailService)
    val userService = UserService(
        userDao = userDao,
        tokenDao = tokenDao,
        token = token,
        hashingService = hashingService,
        otpService = otpService
    )
    val authController = AuthController(userService)
    authRoutes(authController)
    kycRoutes(kycController)
    routing {
        get("/") {
            call.respond(
                HttpStatusCode.OK,
                MessageDTO(successMessage = "Hello, I Am On!")
            )
        }
        get("/health") {
            call.respond(
                HttpStatusCode.OK,
                MessageDTO(successMessage = "Hello, I Am Alive!")
            )
        }
    }
}
