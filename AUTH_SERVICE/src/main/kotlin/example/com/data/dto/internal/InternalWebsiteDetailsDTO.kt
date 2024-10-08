package example.com.data.dto.internal

import kotlinx.serialization.Serializable

@Serializable
data class InternalWebsiteDetailsDTO(
    val clusterId: String,
    val websiteUrl: String,
    val apiKey: String? = null,
    val authToken: String? = null,
    val headers: String? = null,
    val maxRetries: Int
)
