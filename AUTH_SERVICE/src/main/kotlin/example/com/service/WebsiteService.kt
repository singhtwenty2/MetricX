package example.com.service

import example.com.data.dto.request.UpdateWebsiteDetailsDTO
import example.com.data.dto.internal.InternalWebsiteDetailsDTO
import example.com.data.dto.response.WebsiteDetailResponseDTO
import example.com.data.repository.dao.WebsiteDAO
import example.com.util.RecordCreationErrorHandler
import java.text.SimpleDateFormat
import java.util.Date
import java.util.UUID

class WebsiteService(
    private val dao: WebsiteDAO
) {
    fun createWebsite(
        details: InternalWebsiteDetailsDTO
    ): Boolean {
        val isDetailsValid = validateWebsiteDetails(details)
        if (!isDetailsValid) {
            return false
        }
        val cIdAsUUID = UUID.fromString(details.clusterId)
        val currentTime = System.currentTimeMillis().toString()
        val formattedCurrentTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date(currentTime.toLong()))
        val result = dao.createWebsite(
            clusterId = cIdAsUUID,
            updateWebsiteDetailsDTO = UpdateWebsiteDetailsDTO(
                websiteUrl = details.websiteUrl,
                apiKey = details.apiKey,
                authToken = details.authToken,
                headers = details.headers,
                maxRetries = details.maxRetries
            ),
            currentTime = formattedCurrentTime
        )
        when(result) {
            is RecordCreationErrorHandler.Success -> return true
            is RecordCreationErrorHandler.AlreadyExists -> throw IllegalArgumentException("Website already exists")
            is RecordCreationErrorHandler.Error -> throw IllegalArgumentException("Error creating website")
            is RecordCreationErrorHandler.NotFound -> throw IllegalArgumentException("Cluster not found")
        }
    }

    fun getWebsites(clusterId: String): List<WebsiteDetailResponseDTO> {
        val clusterIdAsUUID = UUID.fromString(clusterId)
        val websites = dao.getWebsites(clusterIdAsUUID)
        return websites
    }

    fun getWebsite(
        clusterId: String,
        websiteId: String
    ): WebsiteDetailResponseDTO {
        val clusterIdAsUUID = UUID.fromString(clusterId)
        val websiteIdAsUUID = UUID.fromString(websiteId)
        return dao.getWebsite(
            clusterId = clusterIdAsUUID,
            websiteId = websiteIdAsUUID
        )
    }

    fun updateWebsite(
        cId: String,
        wId: String,
        updateWebsiteDetailsDTO: UpdateWebsiteDetailsDTO
    ): Boolean {
        val clusterId = UUID.fromString(cId)
        val websiteId = UUID.fromString(wId)
        val currentTime = System.currentTimeMillis().toString()
        val formattedCurrentTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date(currentTime.toLong()))
        val result = dao.updateWebsite(
            clusterId = clusterId,
            websiteId = websiteId,
            updateWebsiteDetailsDTO = updateWebsiteDetailsDTO,
            currentTime = formattedCurrentTime
        )
        return when(result) {
            is RecordCreationErrorHandler.Success -> return true
            is RecordCreationErrorHandler.NotFound -> throw IllegalArgumentException("Website not found")
            is RecordCreationErrorHandler.Error -> throw IllegalArgumentException("Error updating website")
            is RecordCreationErrorHandler.AlreadyExists -> throw IllegalArgumentException("Unkwon error")
        }
    }

    fun deleteWebsite(
        cId: String,
        wId: String
    ): Boolean {
        val clusterId = UUID.fromString(cId)
        val websiteId = UUID.fromString(wId)
        val result = dao.deleteWebsite(
            clusterId = clusterId,
            websiteId = websiteId
        )
        return when(result) {
            is RecordCreationErrorHandler.Success -> return true
            is RecordCreationErrorHandler.NotFound -> throw IllegalArgumentException("Website not found")
            is RecordCreationErrorHandler.Error -> throw IllegalArgumentException("Error deleting website")
            is RecordCreationErrorHandler.AlreadyExists -> throw IllegalArgumentException("Unkown error")
        }
    }

    private fun validateWebsiteDetails(
        details: InternalWebsiteDetailsDTO
    ): Boolean {
        val urlPattern = Regex("^(https?|ftp)://[^\\s/$.?#].\\S*$")
        val tokenPattern = Regex("^(Bearer|Basic)? ?[A-Za-z0-9-_.]+$")

        if (!urlPattern.matches(details.websiteUrl)) {
            throw IllegalArgumentException("Invalid website URL")
        }

        details.authToken?.let {
            if (!tokenPattern.matches(it)) {
                throw IllegalArgumentException("Invalid auth token")
            }
        }

        return true
    }
}