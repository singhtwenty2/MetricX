package example.com.routing

import example.com.controller.AuthController
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.routing.*

fun Application.authRoutes(authController: AuthController) {
    routing {
        route("api/v1/auth") {
            post("/signup") {
                authController.signup(call)
            }
            post("/verify-otp") {
                authController.verifyOtp(call)
            }
            post("/login") {
                authController.login(call)
            }
            post("/refresh-token") {
                authController.refreshToken(call)
            }
            post("/access-token") {
                authController.accessToken(call)
            }

        }
        authenticate {
            route("api/v1/protected") {
                get("/me") {
                    authController.aboutMe(call)
                }
            }
        }
    }
}