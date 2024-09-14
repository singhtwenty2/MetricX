package example.com.data.repository.dao

import example.com.data.dto.internal.InternalUserAuthenticationDetailDTO
import example.com.data.dto.internal.InternalUserDTO
import example.com.data.dto.response.UserDTO
import example.com.data.repository.entity.Users
import example.com.security.hashing.HashingService
import example.com.security.hashing.SaltedHash
import example.com.util.RecordCreationErrorHandler
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

class UserDAO(
    private val hashingService: HashingService
) {
    fun createUser(dto: InternalUserDTO): RecordCreationErrorHandler {
        return transaction {
            try {
                val existingRecord = Users.selectAll().where {
                    Users.email eq dto.email
                }.singleOrNull()
                if (existingRecord != null) {
                    return@transaction RecordCreationErrorHandler
                        .AlreadyExists(
                            errorMessage = "User with email ${dto.email} already exists"
                        )
                } else {
                    Users.insert {
                        it[email] = dto.email
                        it[passwordHash] = dto.passwordHash
                        it[salt] = dto.salt
                        it[createdAt] = dto.createdAt
                        it[updatedAt] = dto.updatedAt
                    }
                    return@transaction RecordCreationErrorHandler
                        .Success(
                            successMessage = "User with email ${dto.email} created successfully"
                        )
                }
            } catch (e: Exception) {
                return@transaction RecordCreationErrorHandler
                    .Error(
                        errorMessage = "Failed to create user: ${e.message}"
                    )
            }
        }
    }

    fun authenticateUser(
        email: String,
        plainPassword: String
    ): InternalUserAuthenticationDetailDTO {
        return transaction {
            val user = Users.select {
                Users.email eq email
            }.singleOrNull()

            user?.let {
                val storedPasswordHash = it[Users.passwordHash]
                val storedSalt = it[Users.salt]
                val saltedHash = SaltedHash(
                    salt = storedSalt,
                    hash = storedPasswordHash
                )
                val isPasswordValid = hashingService.verify(plainPassword, saltedHash)

                if (isPasswordValid) {
                    return@transaction InternalUserAuthenticationDetailDTO(
                        userId = user[Users.userId].toString(),
                        isUserAuthentic = true
                    )
                }
            }
            return@transaction InternalUserAuthenticationDetailDTO(
                userId = null,
                isUserAuthentic = false
            )
        }
    }

    fun fetchUserDetails(
        userId: String
    ): Result<UserDTO> {
        val userIdAsUUID = UUID.fromString(userId)
        return transaction {
            val user = Users.selectAll().where { Users.userId eq userIdAsUUID }.singleOrNull()
            user?.let {
                Result.success(
                    UserDTO(
                        email = it[Users.email],
                    )
                )
            } ?: Result.failure(IllegalArgumentException("User with userId $userId not found"))
        }
    }

    fun isUserExists(email: String): Boolean {
        return transaction {
            Users.selectAll().where { Users.email eq email }.count() > 0
        }
    }

    fun fetchUserEmailFromUserId(userId: String): String {
        val userIdAsUUID = UUID.fromString(userId)
        return transaction {
            Users.selectAll().where { Users.userId eq userIdAsUUID }.single()[Users.email]
        }
    }
}