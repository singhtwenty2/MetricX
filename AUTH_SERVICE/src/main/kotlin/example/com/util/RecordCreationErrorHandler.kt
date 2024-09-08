package example.com.util

sealed class RecordCreationErrorHandler {
    data class Success(val successMessage: String) : RecordCreationErrorHandler()
    data class AlreadyExists(val errorMessage: String) : RecordCreationErrorHandler()
    data class Error(val errorMessage: String) : RecordCreationErrorHandler()
}