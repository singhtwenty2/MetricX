package example.com.data.dto.request

import kotlinx.serialization.Serializable

@Serializable
data class SignupDTO(
    val email: String,
    val password: String
)
