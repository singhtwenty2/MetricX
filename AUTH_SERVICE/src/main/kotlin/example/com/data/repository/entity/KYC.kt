package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object KYC : Table(){
    val kycId = integer("kyc_id").autoIncrement()
    val userId = integer("user_id").references(Users.userId)
    val first_name = varchar("first_name", 50)
    val last_name = varchar("last_name", 50)
    val role = varchar("role", 50)
    val companyName = varchar("company_name", 50)
    val teamSize = varchar("team_size", 50)
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(kycId, name = "PK_KYC_ID")
}