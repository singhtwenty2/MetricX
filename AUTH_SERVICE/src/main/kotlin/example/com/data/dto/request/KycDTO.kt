package example.com.data.dto.request

import example.com.data.dto.enums.*
import kotlinx.serialization.Serializable

@Serializable
data class KycDTO(
    val firstName: String,
    val lastName: String,
    val companyName: String,
    val teamSize: TeamSize,
    val phoneNumber: String,
    val jobTitle: JobTitle,
    val notificationPreferences: NotificationPreferences,
    val region: Region,
    val timeZone: TimeZone,
    val postalCode: String,
    val address: String
)
