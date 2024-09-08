package example.com.data.dto.internal

import kotlinx.serialization.Serializable

@Serializable
data class InternalTokenDTO(
    val refreshToken: String? = null,
    val accessToken: String? = null,
    val isUserAuthenticated: Boolean
)
