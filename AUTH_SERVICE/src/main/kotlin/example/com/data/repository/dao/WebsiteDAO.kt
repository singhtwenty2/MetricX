package example.com.data.repository.dao

import example.com.data.dto.request.UpdateWebsiteDetailsDTO
import example.com.data.dto.response.WebsiteDetailResponseDTO
import example.com.data.repository.entity.Websites
import example.com.util.RecordCreationErrorHandler
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.util.UUID

object WebsiteDAO {

    fun createWebsite(
        clusterId: UUID,
        currentTime: String,
        updateWebsiteDetailsDTO: UpdateWebsiteDetailsDTO
    ): RecordCreationErrorHandler {
        return transaction {
            val record = Websites.selectAll().where {
                Websites.websiteUrl eq updateWebsiteDetailsDTO.websiteUrl
            }.singleOrNull()
            if(record != null) {
                RecordCreationErrorHandler.AlreadyExists(
                    errorMessage = "Website with URL ${updateWebsiteDetailsDTO.websiteUrl} already exists",
                )
            } else {
                Websites.insert {
                    it[Websites.clusterId] = clusterId
                    it[websiteUrl] = updateWebsiteDetailsDTO.websiteUrl
                    it[apiKey] = updateWebsiteDetailsDTO.apiKey
                    it[authToken] = updateWebsiteDetailsDTO.authToken
                    it[headers] = updateWebsiteDetailsDTO.headers
                    it[maxRetries] = updateWebsiteDetailsDTO.maxRetries
                    it[createdAt] = currentTime
                    it[updatedAt] = currentTime
                }
                RecordCreationErrorHandler.Success(
                    successMessage = "Website created successfully",
                )
            }
        }
    }

    fun getWebsites(
        clusterId: UUID
    ): List<WebsiteDetailResponseDTO> {
        return transaction {
            Websites.selectAll().where {
                Websites.clusterId eq clusterId
            }.orderBy(Websites.updatedAt, SortOrder.DESC).map {
                WebsiteDetailResponseDTO(
                    clusterId = it[Websites.clusterId].toString(),
                    websiteId = it[Websites.websiteId].toString(),
                    websiteUrl = it[Websites.websiteUrl],
                    apiKey = it[Websites.apiKey],
                    authToken = it[Websites.authToken],
                    headers = it[Websites.headers],
                    maxRetries = it[Websites.maxRetries],
                    createdAt = it[Websites.createdAt],
                    updatedAt = it[Websites.updatedAt]
                )
            }
        }
    }

    fun getWebsite(
        clusterId: UUID,
        websiteId: UUID
    ): WebsiteDetailResponseDTO {
        return transaction {
            Websites.selectAll().where {
                (Websites.clusterId eq clusterId) and (Websites.websiteId eq websiteId)
            }.map {
                WebsiteDetailResponseDTO(
                    clusterId = it[Websites.clusterId].toString(),
                    websiteId = it[Websites.websiteId].toString(),
                    websiteUrl = it[Websites.websiteUrl],
                    apiKey = it[Websites.apiKey],
                    authToken = it[Websites.authToken],
                    headers = it[Websites.headers],
                    maxRetries = it[Websites.maxRetries],
                    createdAt = it[Websites.createdAt],
                    updatedAt = it[Websites.updatedAt]
                )
            }.first()
        }
    }

    fun updateWebsite(
        clusterId: UUID,
        websiteId: UUID,
        currentTime: String,
        updateWebsiteDetailsDTO: UpdateWebsiteDetailsDTO
    ): RecordCreationErrorHandler {
        return transaction {
            val record = Websites.selectAll().where {
                (Websites.clusterId eq clusterId) and (Websites.websiteId eq websiteId)
            }.singleOrNull()
            if(record == null) {
                RecordCreationErrorHandler.NotFound(
                    errorMessage = "Website with ID $websiteId not found",
                )
            } else {
                Websites.update({
                    (Websites.clusterId eq clusterId) and (Websites.websiteId eq websiteId)
                }) {
                    it[websiteUrl] = updateWebsiteDetailsDTO.websiteUrl
                    it[apiKey] = updateWebsiteDetailsDTO.apiKey
                    it[authToken] = updateWebsiteDetailsDTO.authToken
                    it[headers] = updateWebsiteDetailsDTO.headers
                    it[maxRetries] = updateWebsiteDetailsDTO.maxRetries
                    it[updatedAt] = currentTime
                }
                RecordCreationErrorHandler.Success(
                    successMessage = "Website updated successfully",
                )
            }
        }
    }

    fun deleteWebsite(
        clusterId: UUID,
        websiteId: UUID
    ): RecordCreationErrorHandler {
        return transaction {
            val record = Websites.selectAll().where {
                (Websites.clusterId eq clusterId) and (Websites.websiteId eq websiteId)
            }.singleOrNull()
            if(record == null) {
                RecordCreationErrorHandler.NotFound(
                    errorMessage = "Website with ID $websiteId not found",
                )
            } else {
                Websites.deleteWhere {
                    (Websites.clusterId eq clusterId) and (Websites.websiteId eq websiteId)
                }
                RecordCreationErrorHandler.Success(
                    successMessage = "Website deleted successfully",
                )
            }
        }
    }
}