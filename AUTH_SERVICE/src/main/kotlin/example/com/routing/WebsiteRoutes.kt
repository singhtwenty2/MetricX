package example.com.routing

import example.com.controller.WebsiteController
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.auth.authenticate
import io.ktor.server.routing.delete
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route
import io.ktor.server.routing.routing

fun Application.websiteRoutes(websiteController: WebsiteController) {
    routing {
        authenticate {
            route("api/v1/website") {
                post("/create") {
                    websiteController.createWebsite(call)
                }
                get("/all") {
                    websiteController.getWebsites(call)
                }
                get("/") {
                    websiteController.getWebsite(call)
                }
                put("/") {
                    websiteController.updateWebsite(call)
                }
                delete("/") {
                    websiteController.deleteWebsite(call)
                }
            }
        }
    }
}