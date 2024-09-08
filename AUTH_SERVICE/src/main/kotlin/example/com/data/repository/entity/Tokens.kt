package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object Tokens : Table() {
    val tokenId = integer("token_id").autoIncrement()
    val userId = integer("user_id").references(Users.userId)
    val refreshToken = varchar("refreshToken", 255)
    val createdAt = varchar("created_at", 50)
    val expiry = varchar("expiry_at", 50)

    override val primaryKey = PrimaryKey(tokenId, name = "PK_Tokens_ID")
}