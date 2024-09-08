package example.com.data.repository.dao

import example.com.data.dto.internal.InternalKycDTO
import example.com.data.repository.entity.KYC
import example.com.util.RecordCreationErrorHandler
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

object KycDAO {
    fun insertKycDetails(dto: InternalKycDTO): RecordCreationErrorHandler {
        return transaction {
            try {
                val existingRecord = KYC.selectAll().where { KYC.userId eq dto.userId.toInt() }.singleOrNull()
                if (existingRecord != null) {
                    return@transaction RecordCreationErrorHandler
                        .AlreadyExists(
                            errorMessage = "Kyc Details for user with id ${dto.userId} already exists"
                        )
                } else {
                    KYC.insert {
                        it[userId] = dto.userId.toInt()
                        it[first_name] = dto.firstName
                        it[last_name] = dto.lastName
                        it[role] = dto.role
                        it[companyName] = dto.companyName
                        it[teamSize] = dto.teamSize
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

    fun getKycDetails(userId: String): InternalKycDTO {
        return transaction {
            val kyc = KYC.selectAll().where {
                KYC.userId eq userId.toInt()
            }.singleOrNull()
            kyc?.let {
                return@transaction InternalKycDTO(
                    userId = it[KYC.userId].toString(),
                    firstName = it[KYC.first_name],
                    lastName = it[KYC.last_name],
                    role = it[KYC.role],
                    companyName = it[KYC.companyName],
                    teamSize = it[KYC.teamSize],
                    createdAt = it[KYC.createdAt],
                    updatedAt = it[KYC.updatedAt]
                )
            } ?: InternalKycDTO(
                userId = "",
                firstName = "",
                lastName = "",
                role = "",
                companyName = "",
                teamSize = "",
                createdAt = "",
                updatedAt = ""
            )
        }
    }

    fun deleteKycDetails(): Boolean {
        TODO()
    }
}