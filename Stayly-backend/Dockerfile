FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY Stayly-backend/gradlew .
COPY Stayly-backend/gradle gradle
COPY Stayly-backend/build.gradle .
COPY Stayly-backend/settings.gradle .

RUN chmod +x gradlew

COPY Stayly-backend/src src

RUN ./gradlew bootJar --no-daemon

EXPOSE 8080

CMD ["sh", "-c", "java -jar build/libs/*.jar"]