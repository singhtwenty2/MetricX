package example.com.service

import example.com.data.dto.internal.InternalKycDTO
import example.com.data.repository.dao.KycDAO
import example.com.data.repository.dao.UserDAO
import example.com.util.RecordCreationErrorHandler
import java.text.SimpleDateFormat
import java.util.*

class KycService(
    private val kycDao: KycDAO,
    private val userDao: UserDAO
) {
    fun insertKycDetails(request: InternalKycDTO): Boolean {
        val currentTime = System.currentTimeMillis().toString()
        val formattedCurrentTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date(currentTime.toLong()))
        val isKycInserted = kycDao.insertKycDetails(
            InternalKycDTO(
                userId = request.userId,
                firstName = request.firstName,
                lastName = request.lastName,
                companyName = request.companyName,
                teamSize = request.teamSize,
                createdAt = formattedCurrentTime,
                updatedAt = formattedCurrentTime,
                phoneNumber = request.phoneNumber,
                jobTitle = request.jobTitle,
                notificationPreferences = request.notificationPreferences,
                region = request.region,
                timeZone = request.timeZone,
                postalCode = request.postalCode,
                address = request.address
            )
        )
        return when (isKycInserted) {
            is RecordCreationErrorHandler.Success -> {
                true
            }

            is RecordCreationErrorHandler.AlreadyExists -> {
                false
            }

            is RecordCreationErrorHandler.Error -> {
                false
            }

            is RecordCreationErrorHandler.NotFound -> TODO()
        }
    }

    fun updateKycDetails(): Boolean {
        return kycDao.updateKycDetails()
    }

    fun getKycDetails(userId: String): InternalKycDTO? {
        return kycDao.getKycDetails(userId)
    }

    fun deleteKycDetails(): Boolean {
        return kycDao.deleteKycDetails()
    }

    fun getKycStatus(userId: String): Boolean {
        return kycDao.getKycStatus(userId)
    }

    fun getUserEmail(userId: String): String {
        return userDao.fetchUserEmailFromUserId(userId)
    }
}