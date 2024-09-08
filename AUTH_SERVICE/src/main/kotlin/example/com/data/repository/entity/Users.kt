package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object Users : Table() {
    val userId = integer("user_id").autoIncrement()
    val email = varchar("email", 100).uniqueIndex()
    val passwordHash = varchar("password_hash", 100)
    val salt = varchar("salt", 100)
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(userId, name = "PK_Users_ID")
}