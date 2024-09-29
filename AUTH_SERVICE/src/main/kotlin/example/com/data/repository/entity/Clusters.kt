package example.com.data.repository.entity

import example.com.data.dto.enums.IsActive
import org.jetbrains.exposed.sql.Table

object Clusters : Table() {
    val clusterId = uuid("cluster_id").autoGenerate()
    val userId = uuid("user_id").references(Users.userId)
    val clusterName = varchar("cluster_name", 100).uniqueIndex()
    val description = varchar("description", 255).nullable()
    val isActive = varchar("is_active", 50).check {
            it -> it inList IsActive.entries.map { it.name }
    }
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(clusterId, name = "PK_Clusters_ID")
}