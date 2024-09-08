package example.com.service

import example.com.data.repository.dao.OtpDAO
import java.security.MessageDigest
import java.security.SecureRandom
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

class OtpService(
    private val emailService: EmailService,
    private val otpDAO: OtpDAO
) {
    companion object {
        private val secureRandom = SecureRandom()
        private val dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
    }

    fun generateOtp(): String {
        return (1..6)
            .joinToString("") {
                secureRandom.nextInt(10).toString()
            }
    }

    private fun hashOtp(otp: String): String {
        val md = MessageDigest.getInstance("SHA-256")
        return Base64
            .getEncoder()
            .encodeToString(md.digest(otp.toByteArray()))
    }

    fun saveOtpAndSendEmail(
        userEmail: String,
        otp: String
    ): Boolean {
        val hashedOtp = hashOtp(otp)
        val expiry = System.currentTimeMillis() + 8 * 60 * 1000 // 8 minutes
        val now = LocalDateTime.now().format(dateTimeFormatter)

        val isSaved = otpDAO.storeOtp(
            userEmail = userEmail,
            otp = hashedOtp,
            expiryTime = expiry,
            updatedAt = now
        )
        if (isSaved) {
            val emailSent = emailService.sendOtpAsEmail(userEmail, otp)
            if (!emailSent) {
                println("Failed to send OTP email to $userEmail")
            }
        }

        return isSaved
    }

    fun verifyOtp(
        userEmail: String,
        otp: String
    ): Boolean {
        val hashedOtp = hashOtp(otp)
        val storedOtp = otpDAO.fetchOtp(userEmail)
        if(
            storedOtp == hashedOtp &&
            System.currentTimeMillis() < otpDAO.fetchExpiryTime(userEmail)
        ) {
            otpDAO.deleteOtp(userEmail)
            return true
        } else {
            return false
        }
    }
}