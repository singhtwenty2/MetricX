package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object Otps : Table() {
    private val otpId = uuid("otp_id").autoGenerate()
    val userEmail = varchar("user_email", 100).uniqueIndex()
    val otp = varchar("otp", 255)
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)
    val expiryTime = long("expiry_time")

    override val primaryKey = PrimaryKey(otpId, name = "PK_Otps_ID")
}