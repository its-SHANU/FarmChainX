# --- Build stage ---
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Cache dependencies separately from source for faster rebuilds
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline

COPY src ./src
RUN ./mvnw -B clean package -DskipTests

# --- Runtime stage ---
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Render provides PORT at runtime; default kept for local docker run
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
