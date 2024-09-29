package example.com.config

import example.com.data.repository.entity.*
import io.github.cdimascio.dotenv.Dotenv
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.configureDatabase() {
    val dotenv = Dotenv.configure().filename(".env").load()
    val url = dotenv["DB_URL"]
    val driver = dotenv["DB_DRIVER"]
    val user = dotenv["DB_USERNAME"]
    val password = dotenv["DB_PASSWORD"]

    Database.connect(url, driver, user, password)

    transaction {
        SchemaUtils.create(
            Users,
            Tokens,
            Otps,
            KYC,
            Clusters,
            Websites,
            WebsiteHealthLogs,
            EscalationTrees,
            EscalationLevels,
            Contacts,
            Notifications
        )
    }
}
