FROM node:20.19-bookworm-slim AS frontend-build
WORKDIR /app

COPY src/main/frontend/package.json src/main/frontend/package-lock.json ./src/main/frontend/
RUN npm --prefix src/main/frontend ci

COPY src/main/frontend ./src/main/frontend
RUN npm --prefix src/main/frontend run build:vercel

FROM maven:3.9.9-eclipse-temurin-21 AS backend-build
WORKDIR /app

COPY pom.xml ./
COPY src/main/java ./src/main/java
COPY src/main/resources ./src/main/resources
COPY --from=frontend-build /app/src/main/frontend/dist ./src/main/resources/META-INF/resources

RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /work/

COPY --from=backend-build /app/target/quarkus-app/lib/ ./lib/
COPY --from=backend-build /app/target/quarkus-app/*.jar ./
COPY --from=backend-build /app/target/quarkus-app/app/ ./app/
COPY --from=backend-build /app/target/quarkus-app/quarkus/ ./quarkus/

EXPOSE 8080
ENV QUARKUS_HTTP_HOST=0.0.0.0

CMD ["java", "-jar", "quarkus-run.jar"]
