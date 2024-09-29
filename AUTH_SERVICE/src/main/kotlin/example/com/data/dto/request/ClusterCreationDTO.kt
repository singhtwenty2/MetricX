package example.com.data.dto.request

import example.com.data.dto.enums.IsActive
import kotlinx.serialization.Serializable

@Serializable
data class ClusterCreationDTO(
    val clusterName: String,
    val description: String?,
    val isActive: IsActive
)
