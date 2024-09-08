package example.com.data.repository.dao

import example.com.data.repository.entity.Otps
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

object OtpDAO {

    fun storeOtp(
        userEmail: String,
        otp: String,
        expiryTime: Long,
        updatedAt: String
    ): Boolean {
        return transaction {
            val existingRecord = Otps.select {
                Otps.userEmail eq userEmail
            }.singleOrNull()
            if (existingRecord != null) {
                // Update Existing Otp
                Otps.update({ Otps.userEmail eq userEmail }) {
                    it[Otps.otp] = otp
                    it[Otps.expiryTime] = expiryTime
                    it[Otps.updatedAt] = updatedAt
                }
            } else {
                // Insert New Otp
                Otps.insert {
                    it[Otps.userEmail] = userEmail
                    it[Otps.otp] = otp
                    it[Otps.expiryTime] = expiryTime
                    it[Otps.updatedAt] = updatedAt
                    it[createdAt] = updatedAt
                }
            }
            true
        }
    }

    fun fetchOtp(
        userEmail: String
    ): String {
        return transaction {
            Otps.select { Otps.userEmail eq userEmail }
                .singleOrNull()?.get(Otps.otp) ?: ""
        }
    }

    fun fetchExpiryTime(
        userEmail: String
    ): Long {
        return transaction {
            Otps.select { Otps.userEmail eq userEmail }
                .singleOrNull()?.get(Otps.expiryTime) ?: 0L
        }
    }

    fun deleteOtp(
        userEmail: String
    ): Boolean {
        return transaction {
            Otps.deleteWhere { Otps.userEmail eq userEmail } > 0
        }
    }
}