package example.com.data.dto.internal

import kotlinx.serialization.Serializable

@Serializable
data class InternalUserAuthenticationDetailDTO(
    val userId: String? = null,
    val isUserAuthentic: Boolean
)
