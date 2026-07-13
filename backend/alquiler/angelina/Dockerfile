# Stage 1: Igual que el anterior
FROM maven:3.9.16-eclipse-temurin-26-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Imagen Distroless (solo lo esencial para Java)
FROM amazoncorretto:26-alpine-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]