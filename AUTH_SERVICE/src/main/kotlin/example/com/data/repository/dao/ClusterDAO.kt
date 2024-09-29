package example.com.data.repository.dao

import example.com.data.dto.request.ClusterCreationDTO
import example.com.data.dto.response.ClusterDTO
import example.com.data.repository.entity.Clusters
import example.com.util.RecordCreationErrorHandler
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

object ClusterDAO {

    fun createCluster(
        userId: UUID,
        dto: ClusterCreationDTO,
        createdAt: String,
        updatedAt: String
    ): RecordCreationErrorHandler {
        return transaction {
            val record = Clusters.selectAll().where {
                Clusters.clusterName eq dto.clusterName
            }.singleOrNull()
            if (record != null) {
                RecordCreationErrorHandler.AlreadyExists("Cluster with name ${dto.clusterName} already exists")
            } else {
                Clusters.insert {
                    it[Clusters.userId] = userId
                    it[clusterName] = dto.clusterName
                    it[description] = dto.description
                    it[isActive] = dto.isActive.name
                    it[Clusters.createdAt] = createdAt
                    it[Clusters.updatedAt] = updatedAt
                }
                RecordCreationErrorHandler.Success("Cluster created successfully")
            }
        }
    }

    fun getClusters(
        userId: UUID
    ): List<ClusterDTO> {
        return transaction {
            Clusters.selectAll().where {
                Clusters.userId eq userId
            }.map {
                ClusterDTO(
                    it[Clusters.clusterId].toString(),
                    it[Clusters.clusterName],
                    it[Clusters.description],
                    it[Clusters.isActive],
                    it[Clusters.createdAt],
                    it[Clusters.updatedAt]
                )
            }
        }
    }

    fun getCluster(
        userId: UUID,
        clusterId: UUID
    ): ClusterDTO {
        return transaction {
            Clusters.selectAll().where {
                (Clusters.userId eq userId) and (Clusters.clusterId eq clusterId)
            }.map {
                ClusterDTO(
                    it[Clusters.clusterId].toString(),
                    it[Clusters.clusterName],
                    it[Clusters.description],
                    it[Clusters.isActive],
                    it[Clusters.createdAt],
                    it[Clusters.updatedAt]
                )
            }.first()
        }
    }

    fun updateCluster(
        userId: UUID,
        clusterId: UUID,
        dto: ClusterCreationDTO,
        updatedAt: String
    ): RecordCreationErrorHandler {
        return transaction {
            val record = Clusters.selectAll().where {
                (Clusters.userId eq userId) and (Clusters.clusterId eq clusterId)
            }.singleOrNull()
            if (record == null) {
                RecordCreationErrorHandler.Error("Cluster not found")
            } else {
                Clusters.update({ Clusters.clusterId eq clusterId }) {
                    it[clusterName] = dto.clusterName
                    it[description] = dto.description
                    it[isActive] = dto.isActive.name
                    it[Clusters.updatedAt] = updatedAt
                }
                RecordCreationErrorHandler.Success("Cluster updated successfully")
            }
        }
    }

    fun deleteCluster(
        userId: UUID,
        clusterId: UUID
    ): RecordCreationErrorHandler {
        return transaction {
            val record = Clusters.selectAll().where {
                (Clusters.userId eq userId) and (Clusters.clusterId eq clusterId)
            }.singleOrNull()
            if (record == null) {
                RecordCreationErrorHandler.Error("Cluster not found")
            } else {
                Clusters.deleteWhere {
                    (Clusters.userId eq userId) and (Clusters.clusterId eq clusterId)
                }
                RecordCreationErrorHandler.Success("Cluster deleted successfully")
            }
        }
    }
}