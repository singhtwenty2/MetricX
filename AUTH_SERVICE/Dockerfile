# Use a base image with JDK installed
FROM openjdk:17-jdk-slim

# Install netcat for database wait command
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY build/libs/com.metricx.auth-service-all.jar app.jar

# Expose the port the app runs on
EXPOSE 9707

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
