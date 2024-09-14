package example.com.data.repository.dao

import example.com.data.dto.internal.InternalKycDTO
import example.com.data.repository.entity.KYC
import example.com.util.RecordCreationErrorHandler
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

object KycDAO {
    fun insertKycDetails(dto: InternalKycDTO): RecordCreationErrorHandler {
        return transaction {
            val userIdAsUUID = UUID.fromString(dto.userId)!!
            try {
                val existingRecord = KYC.selectAll().where { KYC.userId eq userIdAsUUID }.singleOrNull()
                if (existingRecord != null) {
                    return@transaction RecordCreationErrorHandler
                        .AlreadyExists(
                            errorMessage = "Kyc Details for user with id ${dto.userId} already exists"
                        )
                } else {
                    KYC.insert {
                        it[userId] = userIdAsUUID
                        it[first_name] = dto.firstName
                        it[last_name] = dto.lastName
                        it[companyName] = dto.companyName
                        it[teamSize] = dto.teamSize
                        it[phoneNumber] = dto.phoneNumber
                        it[jobTitle] = dto.jobTitle
                        it[notificationPreferences] = dto.notificationPreferences
                        it[region] = dto.region
                        it[timeZone] = dto.timeZone
                        it[postalCode] = dto.postalCode
                        it[address] = dto.address
                        it[createdAt] = dto.createdAt
                        it[updatedAt] = dto.updatedAt
                    }
                    return@transaction RecordCreationErrorHandler
                        .Success(
                            successMessage = "Kyc Details for user with id ${dto.userId} created successfully"
                        )
                }
            } catch (e: Exception) {
                return@transaction RecordCreationErrorHandler
                    .Error(
                        errorMessage = "Failed to insert KYC Details: ${e.message}"
                    )
            }
        }
    }

    fun updateKycDetails(): Boolean {
        TODO()
    }

    fun getKycDetails(userId: String): InternalKycDTO? {
        return transaction {
            val userIdAsUUID = UUID.fromString(userId)!!
            val kyc = KYC.selectAll().where {
                KYC.userId eq userIdAsUUID
            }.singleOrNull()
            kyc?.let {
                return@transaction InternalKycDTO(
                    userId = it[KYC.userId].toString(),
                    firstName = it[KYC.first_name],
                    lastName = it[KYC.last_name],
                    companyName = it[KYC.companyName],
                    teamSize = it[KYC.teamSize],
                    createdAt = it[KYC.createdAt],
                    jobTitle = it[KYC.jobTitle],
                    notificationPreferences = it[KYC.notificationPreferences],
                    region = it[KYC.region],
                    timeZone = it[KYC.timeZone],
                    postalCode = it[KYC.postalCode],
                    address = it[KYC.address],
                    updatedAt = it[KYC.updatedAt],
                    phoneNumber = it[KYC.phoneNumber]
                )
            } ?: return@transaction null
        }
    }

    fun getKycStatus(userId: String): Boolean {
        return transaction {
            val userIdAsUUID = UUID.fromString(userId)!!
            val kyc = KYC.selectAll().where {
                KYC.userId eq userIdAsUUID
            }.singleOrNull()
            return@transaction kyc != null
        }
    }

    fun deleteKycDetails(): Boolean {
        TODO()
    }
}