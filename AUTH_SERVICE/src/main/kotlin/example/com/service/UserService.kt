package example.com.service

import example.com.data.dto.internal.InternalUserDTO
import example.com.data.dto.internal.InternalTokenDTO
import example.com.data.dto.request.LoginDTO
import example.com.data.dto.request.SignupDTO
import example.com.data.dto.request.VerifyOtpDTO
import example.com.data.dto.response.UserDTO
import example.com.data.repository.dao.TokenDAO
import example.com.data.repository.dao.UserDAO
import example.com.security.hashing.HashingService
import example.com.security.token.JwtConfig
import example.com.util.RecordCreationErrorHandler
import java.text.SimpleDateFormat
import java.util.*

class UserService(
    private val userDao: UserDAO,
    private val tokenDao: TokenDAO,
    private val token: JwtConfig,
    private val hashingService: HashingService,
    private val otpService: OtpService
) {
    fun createUser(requestDTO: SignupDTO): Boolean {
        if (
            requestDTO.password.length < 6 ||
            requestDTO.password.length > 20
        ) {
            throw IllegalArgumentException("Password must be between 6 and 20 characters")
        }
        if (
            !requestDTO.email.contains("@") ||
            !requestDTO.email.contains(".")
        ) {
            throw IllegalArgumentException("Invalid email address")
        }
        try {
            val generatedOtp = otpService.generateOtp()
            val isOtpEventSuccessful = otpService.saveOtpAndSendEmail(
                userEmail = requestDTO.email,
                otp = generatedOtp
            )
            if (!isOtpEventSuccessful) {
                throw Exception("Failed to send OTP. Please try again")
            }
            return true
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        }
    }

    fun verifyEmailWithOtpAndSaveUserDetails(requestDTO: VerifyOtpDTO): Boolean {
        if (
            requestDTO.password.length < 6 ||
            requestDTO.password.length > 20
        ) {
            throw IllegalArgumentException("Password must be between 6 and 20 characters")
        }
        if (
            !requestDTO.email.contains("@") ||
            !requestDTO.email.contains(".")
        ) {
            throw IllegalArgumentException("Invalid email address")
        }
        try {
            val isOtpValid = otpService.verifyOtp(
                userEmail = requestDTO.email,
                otp = requestDTO.otp
            )
            if (!isOtpValid) {
                throw Exception("Invalid OTP")
            }
            val saltedHash = hashingService.generateSaltedHash(requestDTO.password)
            val currentTime = System.currentTimeMillis().toString()
            val formattedCurrentTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date(currentTime.toLong()))
            val result = userDao.createUser(
                InternalUserDTO(
                    email = requestDTO.email,
                    passwordHash = saltedHash.hash,
                    salt = saltedHash.salt,
                    createdAt = formattedCurrentTime,
                    updatedAt = formattedCurrentTime
                )
            )
            when (result) {
                is RecordCreationErrorHandler.Success -> {
                    return true
                }

                is RecordCreationErrorHandler.AlreadyExists -> {
                    throw Exception(result.errorMessage)
                }

                is RecordCreationErrorHandler.Error -> {
                    throw Exception(result.errorMessage)
                }

                else -> {
                    throw Exception("Failed to create user")
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            println(e.message)
            return false
        }
    }

    fun authenticateUser(requestDTO: LoginDTO): InternalTokenDTO {
        if (
            !requestDTO.email.contains("@") ||
            !requestDTO.email.contains(".")
        ) {
            throw IllegalArgumentException("Invalid email address")
        }
        try {
            val authenticationResult = userDao.authenticateUser(
                email = requestDTO.email,
                plainPassword = requestDTO.password
            )
            if (!authenticationResult.isUserAuthentic) {
                throw Exception("Provided credentials are invalid")
            } else {
                val refreshToken = token.generateRefreshToken(
                    userId = authenticationResult.userId.toString()
                )
                val accessToken = token.generateAccessToken(
                    userId = authenticationResult.userId.toString()
                )
                storeRefreshToken(
                    userId = authenticationResult.userId.toString(),
                    refreshToken = refreshToken
                )
                return InternalTokenDTO(
                    accessToken = accessToken,
                    refreshToken = refreshToken,
                    isUserAuthenticated = true
                )
            }
        } catch (e: Exception) {
            e.printStackTrace()
            println(e.message)
            return InternalTokenDTO(
                accessToken = null,
                refreshToken = null,
                isUserAuthenticated = false
            )
        }
    }

    private fun storeRefreshToken(userId: String, refreshToken: String) {
        // Get the expiry time of the refresh token
        val expiryDate = Date(System.currentTimeMillis() + JwtConfig.TOKEN_VALIDITY * 24) // 10 days

        // Format expiry date as String (make sure it matches your database format)
        val expiryDateString = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(expiryDate)
        val currentTime = System.currentTimeMillis().toString()
        val formattedCurrentTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date(currentTime.toLong()))
        tokenDao.insertToken(
            userId = userId,
            refreshToken = refreshToken,
            expiry = expiryDateString,
            createdAt = formattedCurrentTime
        )
    }

    private fun validateRefreshToken(refreshToken: String): Boolean {
        return try {
            val tokenRecord = tokenDao.getTokenDetails(refreshToken)
            if (
                tokenRecord.refreshToken == refreshToken &&
                tokenRecord.expiry > SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date(System.currentTimeMillis()))
            ) {
                true
            } else {
                false
            }
        } catch (e: Exception) {
            e.printStackTrace()
            println(e.message)
            false
        }
    }
    fun generateAccessTokenFromRefreshToken(refreshToken: String): InternalTokenDTO {
        return try {
            val isValidToken = validateRefreshToken(refreshToken)
            if (!isValidToken) {
                throw Exception("Invalid or expired refresh token")
            }
            val userId = tokenDao.getUserIdByToken(refreshToken)
            val newAccessToken = token.generateAccessToken(userId)
            storeRefreshToken(userId, refreshToken)
            InternalTokenDTO(
                accessToken = newAccessToken,
                refreshToken = refreshToken,
                isUserAuthenticated = true
            )
        } catch (e: Exception) {
            e.printStackTrace()
            InternalTokenDTO(
                accessToken = null,
                refreshToken = null,
                isUserAuthenticated = false
            )
        }
    }
    fun genrateRefreshToken(refreshToken: String): InternalTokenDTO {
        return try {
            val isValidToken = validateRefreshToken(refreshToken)
            if (!isValidToken) {
                throw Exception("Invalid or expired refresh token")
            }
            val userId = tokenDao.getUserIdByToken(refreshToken)
            val newRefreshToken = token.generateRefreshToken(userId)
            val newAccessToken = token.generateAccessToken(userId)
            storeRefreshToken(userId, newRefreshToken)
            InternalTokenDTO(
                accessToken = newAccessToken,
                refreshToken = newRefreshToken,
                isUserAuthenticated = true
            )
        } catch (e: Exception) {
            e.printStackTrace()
            InternalTokenDTO(
                accessToken = null,
                refreshToken = null,
                isUserAuthenticated = false
            )
        }
    }
    fun aboutMe(userId: String): UserDTO {
        val result = userDao.fetchUserDetails(userId)
        if(result.isSuccess) {
            return result.getOrNull()!!
        } else {
            throw Exception("Failed to fetch user details")
        }
    }
}