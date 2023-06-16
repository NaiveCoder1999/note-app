FROM maven:3.9.2-eclipse-temurin-17 AS builder
#create folder and subfolders
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME

# add all source code and start compiling
ADD . $HOME
#compile and package to JAR
RUN mvn package

FROM eclipse-temurin:17.0.7_7-jre-jammy
COPY --from=builder /usr/app/target/*.jar /app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]