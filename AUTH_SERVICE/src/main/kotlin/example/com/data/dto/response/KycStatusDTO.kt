package example.com.data.dto.response

import kotlinx.serialization.Serializable

@Serializable
data class KycStatusDTO(
    val isKycDone: Boolean,
    val message: String? = null
)
