package example.com.controller

import example.com.data.dto.request.ClusterCreationDTO
import example.com.data.dto.response.MessageDTO
import example.com.service.ClusterService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*

class ClusterController(
    private val clusterService: ClusterService
) {
    suspend fun createCluster(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let {
            val request = call.receive<ClusterCreationDTO>()
            val isClusterCreated = clusterService.createCluster(it, request)
            if (!isClusterCreated) {
                call.respond(
                    HttpStatusCode.Conflict,
                    MessageDTO(errorMessage = "Failed To Create Cluster. May Be Cluster Already Exists")
                )
                return
            }
            call.respond(
                HttpStatusCode.Created,
                MessageDTO(successMessage = "Cluster Created Successfully")
            )
        } ?: call.respond(
            HttpStatusCode.Unauthorized,
            MessageDTO(errorMessage = "Unauthorized To Create Cluster")
        )
    }

    suspend fun getClusters(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let {
            val clusters = clusterService.getClusters(it)
            call.respond(HttpStatusCode.OK, clusters)
        } ?: call.respond(
            HttpStatusCode.Unauthorized,
            MessageDTO(errorMessage = "Unauthorized To Get Clusters")
        )
    }

    suspend fun getCluster(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let { user_id ->
            val clusterId = call.parameters["clusterId"]
            clusterId?.let { cluster_id ->
                val cluster = clusterService.getCluster(
                    userId = user_id,
                    clusterId = cluster_id
                )
                call.respond(HttpStatusCode.OK, cluster)
            } ?: call.respond(
                HttpStatusCode.BadRequest,
                MessageDTO(errorMessage = "Cluster Id Not Provided")
            )
        } ?: call.respond(
            HttpStatusCode.Unauthorized,
            MessageDTO(errorMessage = "Unauthorized To Get Cluster")
        )
    }

    suspend fun updateCluster(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let { user_id ->
            val clusterId = call.parameters["clusterId"]
            clusterId?.let { cluster_id ->
                val request = call.receive<ClusterCreationDTO>()
                val isClusterUpdated = clusterService.updateCluster(
                    userId = user_id,
                    clusterId = cluster_id,
                    dto = request
                )
                if (!isClusterUpdated) {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        MessageDTO(errorMessage = "Failed To Update Cluster")
                    )
                    return
                }
                call.respond(
                    HttpStatusCode.OK,
                    MessageDTO(successMessage = "Cluster Updated Successfully")
                )
            } ?: call.respond(
                HttpStatusCode.BadRequest,
                MessageDTO(errorMessage = "Cluster Id Not Provided")
            )
        } ?: call.respond(
            HttpStatusCode.Unauthorized,
            MessageDTO(errorMessage = "Unauthorized To Update Cluster")
        )
    }

    suspend fun deleteCluster(call: ApplicationCall) {
        val principal = call.principal<JWTPrincipal>()
        val userId = principal?.getClaim("userId", String::class)
        userId?.let { user_id ->
            val clusterId = call.parameters["clusterId"]
            clusterId?.let { cluster_id ->
                val isClusterDeleted = clusterService.deleteCluster(
                    userId = user_id,
                    clusterId = cluster_id
                )
                if (!isClusterDeleted) {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        MessageDTO(errorMessage = "Failed To Delete Cluster")
                    )
                    return
                }
                call.respond(
                    HttpStatusCode.OK,
                    MessageDTO(successMessage = "Cluster Deleted Successfully")
                )
            } ?: call.respond(
                HttpStatusCode.BadRequest,
                MessageDTO(errorMessage = "Cluster Id Not Provided")
            )
        } ?: call.respond(
            HttpStatusCode.Unauthorized,
            MessageDTO(errorMessage = "Unauthorized To Delete Cluster")
        )
    }
}