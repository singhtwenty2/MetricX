package example.com.routing

import example.com.controller.KycController
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.routing.*

fun Application.kycRoutes(kycController: KycController) {
    routing {
        authenticate {
            route("api/v1/kyc") {
                post("/insert") {
                    kycController.insertKycDetails(call)
                }
                post("/update") {
                    kycController.updateKycDetails(call)
                }
                get("/fetch") {
                    kycController.getKycDetails(call)
                }
                get("/status") {
                    kycController.getKycStatus(call)
                }
            }
        }
    }

}