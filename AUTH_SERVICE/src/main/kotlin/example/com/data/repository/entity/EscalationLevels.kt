package example.com.data.repository.entity

import org.jetbrains.exposed.sql.Table

object EscalationLevels : Table() {
    val levelId = uuid("level_id").autoGenerate()
    val treeId = uuid("tree_id").references(EscalationTrees.treeId)
    val levelOrder = integer("level_order") // Priority order (1 = highest)
    val retryCount = integer("retry_count").default(3) // Number of retries before escalating to next level
    val responseTimeLimit = long("response_time_limit").default(300L) // Max time (in seconds) to wait for a response before escalation
    val createdAt = varchar("created_at", 50)
    val updatedAt = varchar("updated_at", 50)

    override val primaryKey = PrimaryKey(levelId, name = "PK_EscalationLevels_ID")
}