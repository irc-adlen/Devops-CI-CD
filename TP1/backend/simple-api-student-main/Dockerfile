# V1

# FROM openjdk:21-slim

# COPY ./Main.java /app/Main.java

# CMD ["java", "/app/Main.java"]

# V2
# Build
FROM maven:3.9.9-amazoncorretto-21 AS myapp-build
ENV MYAPP_HOME=/opt/myapp 
WORKDIR $MYAPP_HOME
COPY pom.xml .
COPY src/ .
RUN mvn package -DskipTests

# Run
FROM amazoncorretto:21
ENV MYAPP_HOME=/opt/myapp 
WORKDIR $MYAPP_HOME
COPY --from=myapp-build $MYAPP_HOME/target/*.jar $MYAPP_HOME/myapp.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "myapp.jar"]


