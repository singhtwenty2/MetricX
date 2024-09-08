package example.com.data.dto.internal

import kotlinx.serialization.Serializable

@Serializable
data class InternalTokenValidationDTO(
    val userId: String,
    val refreshToken: String,
    val createdAt: String,
    val updatedAt: String
)
