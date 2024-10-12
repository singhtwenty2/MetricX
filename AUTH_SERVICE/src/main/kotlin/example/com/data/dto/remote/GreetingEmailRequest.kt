package example.com.data.dto.remote

import kotlinx.serialization.Serializable

@Serializable
data class GreetingEmailRequest(
    val receiverEmail: String,
    val subject: String,
    val name: String
)
