FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

COPY client/package*.json .
COPY client/angular.json .
COPY client/tsconfig.* .
COPY client/src src

RUN npm ci && ng build




FROM maven:3-eclipse-temurin-21 AS sb-builder

WORKDIR /sbapp


COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src
COPY --from=ng-builder /ngapp/dist/client-side/browser/ src/main/resources/static


RUN mvn package -Dmaven.test.skip=true

FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=sb-builder /sbapp/target/ecommerce-0.0.1-SNAPSHOT.jar ecommerce.jar


ENV PORT=8080 


EXPOSE ${PORT}


ENTRYPOINT SERVER_PORT=${PORT} java -jar ecommerce.jar