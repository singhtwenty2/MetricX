package example.com.data.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class TokenResponseDTO(
    val accessToken: String,
    val refreshToken: String
)
