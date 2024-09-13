package example.com.data.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class MessageDTO(
    val successMessage: String? = null,
    val errorMessage: String? = null
)
