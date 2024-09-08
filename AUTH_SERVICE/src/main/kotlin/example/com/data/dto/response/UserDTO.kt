package example.com.data.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class UserDTO(
    val email: String,
)
