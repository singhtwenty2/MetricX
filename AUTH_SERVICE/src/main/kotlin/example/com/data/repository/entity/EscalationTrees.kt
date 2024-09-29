package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object EscalationTrees : Table() {
    val treeId = uuid("tree_id").autoGenerate()
    val clusterId = uuid("cluster_id").references(Clusters.clusterId)
    val treeName = varchar("tree_name", 100)
    val description = varchar("description", 255).nullable()
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(treeId, name = "PK_EscalationTrees_ID")
}