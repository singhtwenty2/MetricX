package example.com.security.hashing

data class SaltedHash(
    val hash: String,
    val salt: String
)
