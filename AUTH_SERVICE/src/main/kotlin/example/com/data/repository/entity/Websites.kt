package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object Websites : Table() {
    val websiteId = uuid("website_id").autoGenerate()
    val clusterId = uuid("cluster_id").references(Clusters.clusterId)
    val websiteUrl = varchar("website_url", 512)
    val apiKey = varchar("api_key", 512).nullable()
    val authToken = varchar("auth_token", 512).nullable()
    val headers = text("headers").nullable()
    val maxRetries = integer("max_retries").default(3)
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(websiteId, name = "PK_Websites_ID")
}