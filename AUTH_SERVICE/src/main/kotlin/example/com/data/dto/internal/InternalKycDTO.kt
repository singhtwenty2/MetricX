package example.com.data.dto.internal

import kotlinx.serialization.Serializable

@Serializable
data class InternalKycDTO(
    val userId: String,
    val firstName: String,
    val lastName: String,
    val role: String,
    val companyName: String,
    val teamSize: String,
    val createdAt: String,
    val updatedAt: String
)
