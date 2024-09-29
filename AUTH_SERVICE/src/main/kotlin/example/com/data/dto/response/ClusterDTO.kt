package example.com.data.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class ClusterDTO(
    val clusterId: String,
    val clusterName: String,
    val description: String?,
    val isActive: String,
    val createdAt: String,
    val updatedAt: String
)
