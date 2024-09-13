package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object Tokens : Table() {
    private val tokenId = uuid("token_id").autoGenerate()
    val userId = uuid("user_id").references(Users.userId)
    val refreshToken = varchar("refreshToken", 512)  // @TODO: Change the size to prevent future crashes
    val createdAt = varchar("created_at", 50)
    val expiry = varchar("expiry_at", 50)

    override val primaryKey = PrimaryKey(tokenId, name = "PK_Tokens_ID")
}