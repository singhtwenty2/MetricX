package example.com.controller

import example.com.data.dto.request.LoginDTO
import example.com.data.dto.request.RefreshTokenDTO
import example.com.data.dto.request.SignupDTO
import example.com.data.dto.request.VerifyOtpDTO
import example.com.data.dto.response.MessageDTO
import example.com.data.dto.response.TokenResponseDTO
import example.com.service.UserService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*

class AuthController(
    private val userService: UserService
) {
    suspend fun signup(call: ApplicationCall) {
        val request = call.receive<SignupDTO>()
        if (
            request.email.isBlank() ||
            request.password.isBlank()
        ) {
            call
                .respond(
                    status = HttpStatusCode.BadRequest,
                    message = MessageDTO(
                        errorMessage = "Invalid request. Please provide all the required fields"
                    )
                )
        }
        try {
            val isAccountCreated = userService.createUser(request)
            if (!isAccountCreated) {
                call.respond(
                    status = HttpStatusCode.InternalServerError,
                    message = MessageDTO(
                        errorMessage = "Failed to create user. Please try again"
                    )
                )
            }
            call.respond(
                status = HttpStatusCode.OK,
                message = MessageDTO(
                    successMessage = "OTP sent to ${request.email}. Please verify your email"
                )
            )
        } catch (e: Exception) {
            call.respond(
                status = HttpStatusCode.ServiceUnavailable,
                message = MessageDTO(
                    errorMessage = "Error creating user: ${e.message}"
                )
            )
        }
    }

    suspend fun verifyOtp(call: ApplicationCall) {
        val request = call.receive<VerifyOtpDTO>()
        if (
            request.email.isBlank() ||
            request.password.isBlank() ||
            request.otp.isBlank()
        ) {
            call
                .respond(
                    status = HttpStatusCode.BadRequest,
                    message = MessageDTO(
                        errorMessage = "Invalid request. Please provide all the required fields"
                    )
                )
        }
        try {
            val isOtpVerified = userService.verifyEmailWithOtpAndSaveUserDetails(request)
            if (!isOtpVerified) {
                call.respond(
                    status = HttpStatusCode.Unauthorized,
                    message = MessageDTO(
                        errorMessage = "Failed to verify OTP. Please try again"
                    )
                )
            }
            call.respond(
                status = HttpStatusCode.OK,
                message = MessageDTO(
                    successMessage = "OTP verified successfully"
                )
            )
        } catch (e: Exception) {
            call.respond(
                status = HttpStatusCode.ServiceUnavailable,
                message = MessageDTO(
                    errorMessage = "Error verifying OTP: ${e.message}"
                )
            )
        }
    }

    suspend fun login(call: ApplicationCall) {
        val request = call.receive<LoginDTO>()
        if (
            request.email.isBlank() ||
            request.password.isBlank()
        ) {
            call.respond(
                status = HttpStatusCode.BadRequest,
                message = MessageDTO(
                    errorMessage = "Invalid request. Please provide all the required fields"
                )
            )
            return
        }

        try {
            val result = userService.authenticateUser(request)
            if (!result.isUserAuthenticated) {
                call.respond(
                    status = HttpStatusCode.Unauthorized,
                    message = MessageDTO(
                        errorMessage = "Invalid credentials. Please try again"
                    )
                )
                return
            }
            if (result.accessToken == null || result.refreshToken == null) {
                call.respond(
                    status = HttpStatusCode.InternalServerError,
                    message = MessageDTO(
                        errorMessage = "Failed to generate token. Please try again"
                    )
                )
                return
            }
            call.respond(
                status = HttpStatusCode.Accepted,
                message = TokenResponseDTO(
                    accessToken = result.accessToken,
                    refreshToken = result.refreshToken
                )
            )
        } catch (e: Exception) {
            call.respond(
                status = HttpStatusCode.ServiceUnavailable,
                message = MessageDTO(
                    errorMessage = "Error authenticating user: ${e.message}"
                )
            )
        }
    }

    suspend fun refreshToken(call: ApplicationCall) {
        val request = call.receive<RefreshTokenDTO>()
        if (request.refreshToken.isBlank()) {
            call.respond(
                status = HttpStatusCode.BadRequest,
                message = MessageDTO(
                    errorMessage = "Invalid request. Please provide the refresh token"
                )
            )
            return
        }
        try {
            val result = userService.genrateRefreshToken(request.refreshToken)
            if (!result.isUserAuthenticated) {
                call.respond(
                    status = HttpStatusCode.Unauthorized,
                    message = MessageDTO(
                        errorMessage = "Invalid or expired refresh token"
                    )
                )
                return
            }
            call.respond(
                status = HttpStatusCode.Accepted,
                message = TokenResponseDTO(
                    refreshToken = result.refreshToken.toString(),
                    accessToken = result.accessToken.toString()
                )
            )
        } catch (e: Exception) {
            call.respond(
                status = HttpStatusCode.ServiceUnavailable,
                message = MessageDTO(
                    errorMessage = "Error refreshing token: ${e.message}"
                )
            )
        }
    }

    suspend fun accessToken(call: ApplicationCall) {
        val request = call.receive<RefreshTokenDTO>()
        if (request.refreshToken.isBlank()) {
            call.respond(
                status = HttpStatusCode.BadRequest,
                message = MessageDTO(
                    errorMessage = "Invalid request. Please provide the refresh token"
                )
            )
            return
        }
        try {
            val result = userService.generateAccessTokenFromRefreshToken(request.refreshToken)
            if (!result.isUserAuthenticated) {
                call.respond(
                    status = HttpStatusCode.Unauthorized,
                    message = MessageDTO(
                        errorMessage = "Invalid or expired refresh token"
                    )
                )
                return
            }
            call.respond(
                status = HttpStatusCode.Accepted,
                message = TokenResponseDTO(
                    refreshToken = result.refreshToken.toString(),
                    accessToken = result.accessToken.toString()
                )
            )
        } catch (e: Exception) {
            call.respond(
                status = HttpStatusCode.ServiceUnavailable,
                message = MessageDTO(
                    errorMessage = "Error generating access token: ${e.message}"
                )
            )
        }
    }

    suspend fun logout(call: ApplicationCall) {
        TODO()
    }

    suspend fun aboutMe(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let {
            val user = userService.aboutMe(it)
            call.respond(HttpStatusCode.OK, user)
        } ?: run {
            call.respond(
                status = HttpStatusCode.BadRequest,
                message = MessageDTO(
                    errorMessage = "Invalid request. Please provide the required fields"
                )
            )
        }
    }

}