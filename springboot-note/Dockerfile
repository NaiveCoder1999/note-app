FROM maven:3.6.0-jdk-11-slim AS build
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME

#ADD pom.xml $HOME
#RUN mvn dependency:go-offline -B --fail-never

# add all source code and start compiling
ADD . $HOME
RUN mvn package

FROM openjdk:11-jre-slim-buster
COPY --from=build /usr/app/target/*.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]