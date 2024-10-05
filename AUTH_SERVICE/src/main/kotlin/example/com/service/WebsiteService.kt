package example.com.service

import example.com.data.dto.internal.InternalWebsiteDetailsCreateDTO
import example.com.data.dto.request.WebsiteDetailsDTO
import example.com.data.dto.response.WebsiteDetailResponseDTO
import example.com.data.repository.dao.WebsiteDAO
import example.com.util.RecordCreationErrorHandler
import java.util.UUID

class WebsiteService(
    private val dao: WebsiteDAO
) {
    fun createWebsite(
        details: WebsiteDetailsDTO
    ): Boolean {
        val isDetailsValid = validateWebsiteDetails(details)
        if (!isDetailsValid) {
            return false
        }
        val cIdAsUUID = UUID.fromString(details.clusterId)
        val result = dao.createWebsite(
            clusterId = cIdAsUUID,
            internalWebsiteDetailsCreateDTO = InternalWebsiteDetailsCreateDTO(
                websiteUrl = details.websiteUrl,
                apiKey = details.apiKey,
                authToken = details.authToken,
                headers = details.headers,
                maxRetries = details.maxRetries
            )
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

    fun getWebsite() {
        TODO("Not yet implemented")
    }

    fun updateWebsite() {
        TODO("Not yet implemented")
    }

    fun deleteWebsite() {
        TODO("Not yet implemented")
    }

    private fun validateWebsiteDetails(
        details: WebsiteDetailsDTO
    ): Boolean {
        val urlPattern = Regex("^(https?|ftp)://[^\\s/$.?#].\\S*$")
        val tokenPattern = Regex("^[A-Za-z0-9-_]+$")

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