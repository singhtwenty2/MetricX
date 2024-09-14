package example.com.data.repository.entity

import example.com.data.dto.enums.*
import org.jetbrains.exposed.sql.Table

object KYC : Table() {
    private val kycId = uuid("kyc_id").autoGenerate()
    val userId = uuid("user_id").references(Users.userId)
    val first_name = varchar("first_name", 50)
    val last_name = varchar("last_name", 50)
    val companyName = varchar("company_name", 50)
    val teamSize = varchar("team_size", 50).check {
        it -> it inList TeamSize.entries.map { it.name }
    }
    val phoneNumber = varchar("phone_number", 50)
    val jobTitle = varchar("job_title", 50).check {
        it -> it inList JobTitle.entries.map { it.name }
    }
    val notificationPreferences = varchar(
        "notification_preferences",
        50
    ).check {
        it -> it inList NotificationPreferences.entries.map { it.name }
    }
    val region = varchar("region", 50).check {
        it -> it inList Region.entries.map { it.name }
    }
    val timeZone = varchar("time_zone", 50).check {
        it -> it inList TimeZone.entries.map { it.name }
    }
    val postalCode = varchar("postal_code", 50)
    val address = varchar("address", 300)
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(kycId, name = "PK_KYC_ID")
}