package example.com.data.repository.dao

import example.com.data.dto.internal.InternalTokenDetailDTO
import example.com.data.repository.entity.Tokens
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object TokenDAO {

    fun insertToken(
        userId: String,
        refreshToken: String,
        expiry: String,
        createdAt: String
    ): Boolean {
        return transaction {
            Tokens.insert {
                it[Tokens.userId] = userId.toInt()
                it[Tokens.refreshToken] = refreshToken
                it[Tokens.createdAt] = createdAt
                it[Tokens.expiry] = expiry
            }
            true
        }
    }

    fun getTokenDetails(refreshToken: String): InternalTokenDetailDTO {
        return transaction {
            val token = Tokens.select {
                Tokens.refreshToken eq refreshToken
            }.singleOrNull()
            token?.let {
                InternalTokenDetailDTO(
                    refreshToken = token[Tokens.refreshToken],
                    expiry = token[Tokens.expiry]
                )
            } ?: InternalTokenDetailDTO("", "")
        }
    }
    fun getUserIdByToken(refreshToken: String): String {
        return transaction {
            Tokens.select {
                Tokens.refreshToken eq refreshToken
            }.singleOrNull()?.get(Tokens.userId).toString()
        }
    }
}

