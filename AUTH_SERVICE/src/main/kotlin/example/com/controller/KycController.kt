package example.com.controller

import example.com.data.dto.internal.InternalKycDTO
import example.com.data.dto.request.KycDTO
import example.com.data.dto.response.KycResponseDTO
import example.com.data.dto.response.KycStatusDTO
import example.com.data.dto.response.MessageDTO
import example.com.service.EmailService
import example.com.service.KycService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*

class KycController(
    private val kycService: KycService,
    private val emailService: EmailService
) {
    suspend fun insertKycDetails(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let {
            val userEmail = kycService.getUserEmail(userId)
            val request = call.receive<KycDTO>()
            if (
                request.firstName.isBlank() ||
                request.lastName.isBlank() ||
                request.companyName.isBlank() ||
                request.teamSize.name.isBlank() ||
                request.phoneNumber.isBlank() ||
                request.jobTitle.name.isBlank() ||
                request.notificationPreferences.name.isBlank() ||
                request.region.name.isBlank() ||
                request.timeZone.name.isBlank() ||
                request.postalCode.isBlank() ||
                request.address.isBlank()
            ) {
                call.respond(
                    status = HttpStatusCode.BadRequest,
                    message = MessageDTO(
                        errorMessage = "Invalid request. Please provide all the required fields"
                    )
                )
                return
            }
            val isKycSuccessful = kycService.insertKycDetails(
                InternalKycDTO(
                    userId = userId,
                    firstName = request.firstName,
                    lastName = request.lastName,
                    companyName = request.companyName,
                    teamSize = request.teamSize.name,
                    createdAt = "",
                    updatedAt = "",
                    phoneNumber = request.phoneNumber,
                    jobTitle = request.jobTitle.name,
                    notificationPreferences = request.notificationPreferences.name,
                    region = request.region.name,
                    timeZone = request.timeZone.name,
                    postalCode = request.postalCode,
                    address = request.address
                )
            )
            if (isKycSuccessful) {
                call.respond(
                    status = HttpStatusCode.Created,
                    message = MessageDTO(
                        successMessage = "KYC details inserted successfully"
                    )
                )
                emailService.sendGreetingEmail(
                    toEmail = userEmail,
                    name = "${request.firstName} ${request.lastName}"
                )
            } else {
                call.respond(
                    status = HttpStatusCode.InternalServerError,
                    message = MessageDTO(
                        errorMessage = "Failed to insert KYC details"
                    )
                )
            }
        }
    }

    suspend fun updateKycDetails(call: ApplicationCall) {
        kycService.updateKycDetails()
    }

    suspend fun getKycDetails(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let {
            val kycDetails = kycService.getKycDetails(userId)
            if (kycDetails == null) {
                call.respond(
                    status = HttpStatusCode.NotFound,
                    message = MessageDTO(
                        errorMessage = "KYC details not found"
                    )
                )
                return
            }
            val response = KycResponseDTO(
                userId = kycDetails.userId,
                firstName = kycDetails.firstName,
                lastName = kycDetails.lastName,
                companyName = kycDetails.companyName,
                teamSize = kycDetails.teamSize,
                createdAt = kycDetails.createdAt,
                updatedAt = kycDetails.updatedAt,
                phoneNumber = kycDetails.phoneNumber,
                jobTitle = kycDetails.jobTitle,
                notificationPreferences = kycDetails.notificationPreferences,
                region = kycDetails.region,
                timeZone = kycDetails.timeZone,
                postalCode = kycDetails.postalCode,
                address = kycDetails.address
            )
            call.respond(HttpStatusCode.OK, response)
        }
    }

    suspend fun getKycStatus(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let {
            val kycStatus = kycService.getKycStatus(userId)
            if (kycStatus) {
                call.respond(
                    status = HttpStatusCode.OK,
                    message = KycStatusDTO(
                        isKycDone = true,
                        message = "KYC details are available"
                    )
                )
            } else {
                call.respond(
                    status = HttpStatusCode.OK,
                    message = KycStatusDTO(
                        isKycDone = false,
                        message = "KYC details are not available"
                    )
                )
            }
        }
    }

    suspend fun deleteKycDetails(call: ApplicationCall) {
        kycService.deleteKycDetails()
    }
}