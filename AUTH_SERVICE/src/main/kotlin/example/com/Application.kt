package example.com

import example.com.config.*
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureSerialization()
    configureDatabase()
    configureMonitoring()
    configureHTTP()
    configureSecurity()
    configureRouting()
}
