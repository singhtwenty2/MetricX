package example.com.data.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class WebsiteDetailResponseDTO(
    val clusterId: String,
    val websiteId: String,
    val websiteUrl: String,
    val apiKey: String? = null,
    val authToken: String? = null,
    val headers: String? = null,
    val maxRetries: Int,
    val createdAt: String,
    val updatedAt: String
)
