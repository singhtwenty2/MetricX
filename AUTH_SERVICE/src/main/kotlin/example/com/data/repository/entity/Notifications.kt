package example.com.data.repository.entity

import example.com.data.dto.enums.IsAccepted
import example.com.data.dto.enums.NotificationMedium
import example.com.data.dto.enums.NotificationStatus
import org.jetbrains.exposed.sql.Table

object Notifications : Table() {
    val notificationId = uuid("notification_id").autoGenerate()
    val websiteId = uuid("website_id").references(Websites.websiteId)
    val contactId = uuid("contact_id").references(Contacts.contactId)
    val message = text("message")
    val sentAt = varchar("sent_at", 50)
    val medium = varchar("medium", 50).check { it ->
        it inList NotificationMedium.entries.map { it.name }
    }
    val responseReceivedAt = varchar("response_received_at", 50).nullable() // When the contact responded, if any
    val isAccepted = varchar("is_accepted", 50).default(IsAccepted.PENDING.name).check { it ->
        it inList IsAccepted.entries.map { it.name }
    }
    val retryCount = integer("retry_count").default(0)
    val maxRetryLimit = integer("max_retry_limit").default(3)
    val notificationStatus = varchar("notification_status", 50).default(NotificationStatus.PENDING.name).check { it ->
        it inList NotificationStatus.entries.map { it.name }
    }
    val createdAt = varchar("created_at", 50)

    override val primaryKey = PrimaryKey(notificationId, name = "PK_Notifications_ID")
}