package example.com.data.repository.entity

import example.com.data.dto.enums.IsPrimaryContact
import example.com.data.dto.enums.JobTitle
import org.jetbrains.exposed.sql.Table

object Contacts : Table() {
    val contactId = uuid("contact_id").autoGenerate()
    val userId = uuid("user_id").references(Users.userId)
    val escalationLevelId = uuid("escalation_level_id").references(EscalationLevels.levelId)
    val name = varchar("name", 100)
    val email = varchar("email", 100).uniqueIndex()
    val phoneNumber = varchar("phone_number", 50).nullable()
    val role = varchar("role", 50).check {
            it -> it inList JobTitle.entries.map { it.name }
    }
    val isPrimary = varchar("is_primary", 50).check {
            it -> it inList IsPrimaryContact.entries.map { it.name }
    }.default(IsPrimaryContact.TRUE.name) // If true, this contact is the primary receiver for this level
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(contactId, name = "PK_Contacts_ID")
}