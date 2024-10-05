package example.com.controller

import example.com.data.dto.request.WebsiteDetailsDTO
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
        val request = call.receive<WebsiteDetailsDTO>()
        clusterId?.let {
            val isWebsiteDetailsCreated = websiteService.createWebsite(
                details = WebsiteDetailsDTO(
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
        websiteService.getWebsite()
    }

    suspend fun updateWebsite(call: ApplicationCall) {
        websiteService.updateWebsite()
    }

    suspend fun deleteWebsite() {
        websiteService.deleteWebsite()
    }
}