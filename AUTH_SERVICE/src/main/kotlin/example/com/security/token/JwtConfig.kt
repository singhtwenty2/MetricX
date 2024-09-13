package example.com.security.token

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import io.github.cdimascio.dotenv.Dotenv
import java.util.*

object JwtConfig {
    private val dotenv = Dotenv.configure().filename(".env").load()
    private val SECRET = dotenv["JWT_SECRET"]
    private val ISSUER = dotenv["JWT_ISSUER"]
    val AUDIENCE = dotenv["JWT_AUDIENCE"]
    const val TOKEN_VALIDITY = 36_000_00 * 10 // 10 hours

    private val algorithm = Algorithm.HMAC512(SECRET)

    val verifier: JWTVerifier = JWT
        .require(algorithm)
        .withIssuer(ISSUER)
        .withAudience(AUDIENCE)
        .build()

    fun generateAccessToken(userId: String): String = JWT.create()
        .withAudience(AUDIENCE)
        .withIssuer(ISSUER)
        .withClaim("userId", userId)
        .withExpiresAt(Date(System.currentTimeMillis() + TOKEN_VALIDITY))
        .sign(algorithm)

    fun generateRefreshToken(userId: String): String = JWT.create()
        .withAudience(AUDIENCE)
        .withIssuer(ISSUER)
        .withClaim("userId", userId)
        .withExpiresAt(Date(System.currentTimeMillis() + TOKEN_VALIDITY * 24)) // 10 days
        .sign(algorithm)
}