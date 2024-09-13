package example.com.config

import example.com.security.token.JwtConfig
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*

fun Application.configureSecurity() {
    val jwtRealm = "ktor sample app"
    authentication {
        jwt {
            realm = jwtRealm
            verifier(JwtConfig.verifier)
            validate { credential ->
                if (credential.payload.audience.contains(JwtConfig.AUDIENCE)) JWTPrincipal(credential.payload) else null
            }
        }
    }

}
