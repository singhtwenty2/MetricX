package example.com.service

import example.com.data.dto.request.ClusterCreationDTO
import example.com.data.dto.response.ClusterDTO
import example.com.data.repository.dao.ClusterDAO
import example.com.util.RecordCreationErrorHandler
import java.text.SimpleDateFormat
import java.util.*

class ClusterService(
    private val clusterDao: ClusterDAO
) {
    fun createCluster(
        userId: String,
        dto: ClusterCreationDTO
    ): Boolean {
        val error = validationError(dto)
        val currentTime = System.currentTimeMillis()
        val userIdAsUUID = UUID.fromString(userId)
        val formattedTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentTime)
        if (error != null) {
            throw IllegalArgumentException(error)
        }
        return when (
            clusterDao.createCluster(
                userIdAsUUID,
                dto,
                formattedTime,
                formattedTime
            )
        ) {
            is RecordCreationErrorHandler.Success -> true
            is RecordCreationErrorHandler.AlreadyExists -> false
            is RecordCreationErrorHandler.Error -> false
            is RecordCreationErrorHandler.NotFound -> TODO()
        }
    }

    fun getClusters(
        userId: String
    ): List<ClusterDTO> {
        val userIdAsUUID = UUID.fromString(userId)
        return clusterDao.getClusters(userIdAsUUID)
    }

    fun getCluster(
        userId: String,
        clusterId: String
    ): ClusterDTO {
        val userIdAsUUID = UUID.fromString(userId)
        val clusterIdAsUUID = UUID.fromString(clusterId)
        return clusterDao.getCluster(userIdAsUUID, clusterIdAsUUID)
    }

    fun updateCluster(
        userId: String,
        clusterId: String,
        dto: ClusterCreationDTO
    ): Boolean {
        val userIdAsUUID = UUID.fromString(userId)
        val clusterIdAsUUID = UUID.fromString(clusterId)
        val currentTime = System.currentTimeMillis()
        val formattedTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentTime)
        return when (
            clusterDao.updateCluster(
                userIdAsUUID,
                clusterIdAsUUID,
                dto,
                formattedTime
            )
        ) {
            is RecordCreationErrorHandler.Success -> true
            is RecordCreationErrorHandler.AlreadyExists -> false
            is RecordCreationErrorHandler.Error -> false
            is RecordCreationErrorHandler.NotFound -> TODO()
        }
    }

    fun deleteCluster(
        userId: String,
        clusterId: String
    ): Boolean {
        val userIdAsUUID = UUID.fromString(userId)
        val clusterIdAsUUID = UUID.fromString(clusterId)
        return when (clusterDao.deleteCluster(userIdAsUUID, clusterIdAsUUID)) {
            is RecordCreationErrorHandler.Success -> true
            is RecordCreationErrorHandler.AlreadyExists -> false
            is RecordCreationErrorHandler.Error -> false
            is RecordCreationErrorHandler.NotFound -> TODO()
        }
    }
}

private fun validationError(dto: ClusterCreationDTO): String? {
    val bannedWords = listOf(
        "abuse", "idiot", "stupid", "fool", "dumb", "hate", "loser",
        "ugly", "trash", "nonsense", "moron", "jerk", "scam", "fraud",
        "incompetent", "worthless", "cheat", "liar", "useless", "annoying",
        "ignorant", "pathetic", "stupid", "garbage", "filthy", "idiotic",
        "shameful", "disgraceful", "offensive", "horrible", "terrible"
    )
    bannedWords.forEach {
        if (dto.clusterName.contains(it, ignoreCase = true)) {
            return "Cluster Name cannot contain the word $it"
        }
    }
    return when {
        dto.clusterName.isBlank() -> "Cluster Name cannot be blank"
        dto.isActive.name.isBlank() -> "isActive cannot be null"
        else -> null
    }
}