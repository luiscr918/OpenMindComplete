# Usamos una imagen ligera de Java 21
FROM eclipse-temurin:21-jdk-alpine

# Creamos una carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo .jar generado por Maven
# (El asterisco * ayuda a que no importe la versión exacta del nombre)
COPY target/OpenMind-0.0.1-SNAPSHOT.jar app.jar

# Exponemos el puerto 8080
EXPOSE 8080

# Ejecutamos la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]