package example.com.data.dto.internal

import example.com.data.dto.enums.*
import kotlinx.serialization.Serializable

@Serializable
data class InternalKycDTO(
    val userId: String,
    val firstName: String,
    val lastName: String,
    val companyName: String,
    val teamSize: String,
    val phoneNumber: String,
    val jobTitle: String,
    val notificationPreferences: String,
    val region: String,
    val timeZone: String,
    val postalCode: String,
    val address: String,
    val createdAt: String,
    val updatedAt: String
)
