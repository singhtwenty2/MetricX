package example.com.routing

import example.com.controller.ClusterController
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.routing.*

fun Application.clusterRoutes(clusterController: ClusterController) {
    routing {
        authenticate {
            route("api/v1/clusters") {
                post("/create") {
                    clusterController.createCluster(call)
                }
                get("/") {
                    clusterController.getClusters(call)
                }
                get("/{clusterId}") {
                    clusterController.getCluster(call)
                }
                put("/{clusterId}") {
                    clusterController.updateCluster(call)
                }
                delete("/{clusterId}") {
                    clusterController.deleteCluster(call)
                }
            }
        }
    }
}