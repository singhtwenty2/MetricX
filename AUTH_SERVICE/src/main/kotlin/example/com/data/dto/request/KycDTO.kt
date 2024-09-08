package example.com.data.dto.request

import kotlinx.serialization.Serializable

@Serializable
data class KycDTO(
    val firstName: String,
    val lastName: String,
    val role: String,
    val companyName: String,
    val teamSize: String
)
