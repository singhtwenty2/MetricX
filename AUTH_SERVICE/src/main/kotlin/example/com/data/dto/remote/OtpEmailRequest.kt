package example.com.data.dto.remote

import kotlinx.serialization.Serializable

@Serializable
data class OtpEmailRequest(
    val receiverEmail: String,
    val subject: String,
    val otp: String
)
