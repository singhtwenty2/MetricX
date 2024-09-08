package example.com.configs

import example.com.data.repository.entity.KYC
import example.com.data.repository.entity.Otps
import example.com.data.repository.entity.Tokens
import example.com.data.repository.entity.Users
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.configureDatabase() {
    val config = environment.config.config("ktor.database")
    val driver = config.property("driver").getString()
    val url = config.property("url").getString()
    val user = config.property("user").getString()
    val password = config.property("password").getString()

    Database.connect(url, driver, user, password)

    transaction {
        SchemaUtils.create(
            Users,
            Tokens,
            Otps,
            KYC
        )
    }
}
