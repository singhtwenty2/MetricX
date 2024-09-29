package example.com.data.repository.entity

import example.com.data.dto.enums.IsResponsive
import example.com.data.dto.enums.WebsiteStatus
import org.jetbrains.exposed.sql.Table

object WebsiteHealthLogs : Table() {
    val logId = uuid("log_id").autoGenerate()
    val websiteId = uuid("website_id").references(Websites.websiteId)
    val desktopResponseTime = double("desktop_response_time").nullable()
    val mobileResponseTime = double("mobile_response_time").nullable()
    val desktopStatus = varchar("desktop_status", 20).nullable().check {
            it -> it inList WebsiteStatus.entries.map { it.name }
    }
    val mobileStatus = varchar("mobile_status", 20).nullable().check {
            it -> it inList WebsiteStatus.entries.map { it.name }
    }
    val mobileJsErrors = text("mobile_jsErrors").nullable()
    val desktopJsErrors = text("desktop_jsErrors").nullable()
    val desktopScreenshotUrl = varchar("desktop_screenshot_url", 512).nullable()
    val mobileScreenshotUrl = varchar("mobile_screenshot_url", 512).nullable()
    val isResponsive = varchar("is_mobile_responsive", 50).nullable().check {
            it -> it inList IsResponsive.entries.map { it.name }
    }
    val checkedAt = varchar("checked_at", 50)
    val createdAt = varchar("created_at", 50)

    override val primaryKey = PrimaryKey(logId, name = "PK_HealthLogs_ID")
}