package example.com.data.dto.internal

import kotlinx.serialization.Serializable

@Serializable
data class InternalUserDTO(
    val email: String,
    val passwordHash: String,
    val salt: String,
    val createdAt: String,
    val updatedAt: String
)
