package example.com.config

import example.com.controller.AuthController
import example.com.controller.ClusterController
import example.com.controller.KycController
import example.com.controller.WebsiteController
import example.com.data.dto.response.MessageDTO
import example.com.data.repository.dao.*
import example.com.routing.authRoutes
import example.com.routing.clusterRoutes
import example.com.routing.kycRoutes
import example.com.routing.websiteRoutes
import example.com.security.hashing.SHA256HashingService
import example.com.security.token.JwtConfig
import example.com.service.*
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
    val clusterDAO = ClusterDAO
    val clusterService = ClusterService(clusterDAO)
    val clusterController = ClusterController(clusterService)
    val websiteDAO = WebsiteDAO
    val websiteService = WebsiteService(websiteDAO)
    val websiteController = WebsiteController(websiteService)
    authRoutes(authController)
    kycRoutes(kycController)
    clusterRoutes(clusterController)
    websiteRoutes(websiteController)
}
