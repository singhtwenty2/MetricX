package example.com.data.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class KycResponseDTO(
    val userId: String,
    val firstName: String,
    val lastName: String,
    val role: String,
    val companyName: String,
    val teamSize: String,
    val createdAt: String,
    val updatedAt: String
)
