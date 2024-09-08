package example.com.data.dto.request

import kotlinx.serialization.Serializable

@Serializable
data class VerifyOtpDTO(
    val email: String,
    val password: String,
    val otp: String
)
