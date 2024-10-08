package example.com.data.dto.request

import kotlinx.serialization.Serializable

@Serializable
data class WebsiteDetailsCreationDTO(
    val websiteUrl: String,
    val apiKey: String? = null,
    val authToken: String? = null,
    val headers: String? = null,
    val maxRetries: Int
)
