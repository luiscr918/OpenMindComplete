# -------- ETAPA 1: BUILD --------
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copiamos pom.xml primero
COPY pom.xml .

# Descargamos dependencias
RUN mvn dependency:go-offline

# Copiamos el código fuente
COPY src ./src

# Construimos el jar
RUN mvn clean package -DskipTests

# -------- ETAPA 2: RUNTIME --------
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copiamos el jar desde la etapa builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
