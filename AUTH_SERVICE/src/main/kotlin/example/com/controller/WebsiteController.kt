package example.com.controller

import example.com.data.dto.internal.InternalWebsiteDetailsDTO
import example.com.data.dto.request.UpdateWebsiteDetailsDTO
import example.com.data.dto.request.WebsiteDetailsCreationDTO
import example.com.data.dto.response.MessageDTO
import example.com.service.WebsiteService
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.ApplicationCall
import io.ktor.server.request.receive
import io.ktor.server.response.respond

class WebsiteController(
    private val websiteService: WebsiteService
) {
    suspend fun createWebsite(call: ApplicationCall) {
        val clusterId = call.request.queryParameters["cId"]
        val request = call.receive<WebsiteDetailsCreationDTO>()
        clusterId?.let {
            val isWebsiteDetailsCreated = websiteService.createWebsite(
                details = InternalWebsiteDetailsDTO(
                    clusterId = it,
                    websiteUrl = request.websiteUrl,
                    apiKey = request.apiKey,
                    authToken = request.authToken,
                    headers = request.headers,
                    maxRetries = request.maxRetries
                )
            )
            if(!isWebsiteDetailsCreated) {
                return@let call.respond(
                    status = HttpStatusCode.Conflict,
                    message = MessageDTO(errorMessage = "Failed To Insert Website. May Be Website Already Exists")
                )
            }
            return@let call.respond(
                status = HttpStatusCode.Created,
                message = MessageDTO(successMessage = "Website Created Successfully")
            )
        } ?: call.respond(
            status = HttpStatusCode.BadRequest,
            message = MessageDTO(errorMessage = "Cluster Id Not Found")
        )
    }

    suspend fun getWebsites(call: ApplicationCall) {
        val clusterId = call.request.queryParameters["cId"]
        clusterId?.let {
            val result = websiteService.getWebsites(it)
            if(result.isEmpty()) {
                return@let call.respond(
                    status = HttpStatusCode.NotFound,
                    message = MessageDTO(errorMessage = "No Websites Found")
                )
            }
            return@let call.respond(
                status = HttpStatusCode.OK,
                message = result
            )
        } ?: call.respond(
            status = HttpStatusCode.BadRequest,
            message = MessageDTO(errorMessage = "Cluster Id Not Found")
        )
    }

    suspend fun getWebsite(call: ApplicationCall) {
        val clusterId = call.request.queryParameters["cId"]
        val websiteId = call.request.queryParameters["wId"]
        clusterId?.let {cId ->
            websiteId?.let { wId ->
                val result = websiteService.getWebsite(cId, wId)
                return@let call.respond(
                    status = HttpStatusCode.OK,
                    message = result
                )
            } ?: call.respond(
                status = HttpStatusCode.BadRequest,
                message = MessageDTO(errorMessage = "Website Id Not Found")
            )
        } ?: call.respond(
            status = HttpStatusCode.BadRequest,
            message = MessageDTO(errorMessage = "Cluster Id Not Found")
        )
    }

    suspend fun updateWebsite(call: ApplicationCall) {
        val cId = call.request.queryParameters["cId"]
        val wId = call.request.queryParameters["wId"]
        val request = call.receive<UpdateWebsiteDetailsDTO>()
        cId?.let { clusterId ->
            wId?.let { websiteId ->
                val isWebsiteUpdated = websiteService.updateWebsite(
                    cId = clusterId,
                    wId = websiteId,
                    updateWebsiteDetailsDTO = request
                )
                if(!isWebsiteUpdated) {
                    return@let call.respond(
                        status = HttpStatusCode.Conflict,
                        message = MessageDTO(errorMessage = "Failed To Update Website")
                    )
                }
                return@let call.respond(
                    status = HttpStatusCode.OK,
                    message = MessageDTO(successMessage = "Website Updated Successfully")
                )
            } ?: call.respond(
                status = HttpStatusCode.BadRequest,
                message = MessageDTO(errorMessage = "Website Id Not Found")
            )
        } ?: call.respond(
            status = HttpStatusCode.BadRequest,
            message = MessageDTO(errorMessage = "Cluster Id Not Found")
        )
    }

    suspend fun deleteWebsite(call: ApplicationCall) {
        val cId = call.request.queryParameters["cId"]
        val wId = call.request.queryParameters["wId"]
        cId?.let { clusterId ->
            wId?.let { websiteId ->
                val isWebsiteDeleted = websiteService.deleteWebsite(
                    cId = clusterId,
                    wId = websiteId
                )
                if(!isWebsiteDeleted) {
                    return@let call.respond(
                        status = HttpStatusCode.Conflict,
                        message = MessageDTO(errorMessage = "Failed To Delete Website")
                    )
                }
                return@let call.respond(
                    status = HttpStatusCode.OK,
                    message = MessageDTO(successMessage = "Website Deleted Successfully")
                )
            } ?: call.respond(
                status = HttpStatusCode.BadRequest,
                message = MessageDTO(errorMessage = "Website Id Not Found")
            )
        } ?: call.respond(
            status = HttpStatusCode.BadRequest,
            message = MessageDTO(errorMessage = "Cluster Id Not Found")
        )
    }
}