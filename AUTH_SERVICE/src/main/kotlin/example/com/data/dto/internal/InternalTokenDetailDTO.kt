package example.com.data.dto.internal

import kotlinx.serialization.Serializable

@Serializable
data class InternalTokenDetailDTO(
    val refreshToken: String,
    val expiry: String
)
