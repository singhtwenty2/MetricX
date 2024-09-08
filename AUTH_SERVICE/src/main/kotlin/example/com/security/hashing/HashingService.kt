package example.com.security.hashing

interface HashingService {
    fun generateSaltedHash(
        value: String,
        saltLength: Int = 32
    ): SaltedHash

    fun verify(
        value: String,
        saltedHash: SaltedHash
    ): Boolean

    fun generateHashWithExistingSalt(
        value: String,
        existingSalt: String
    ): String
}