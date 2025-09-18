# Spring Cloud Config Server

This project is a Spring Cloud Config Server that provides server-side support for externalized configuration in a distributed system. It allows applications to retrieve their configuration from a central location, making it easier to manage and maintain application settings.

## Project Structure

```
spring-cloud-config-server
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── configserver
│   │   │               └── ConfigServerApplication.java
│   │   └── resources
│   │       ├── application.yml
│   │       └── bootstrap.yml
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── configserver
│                       └── ConfigServerApplicationTests.java
├── .gitignore
├── pom.xml
└── README.md
```

## Prerequisites

- Java 11 or higher
- Maven 3.6 or higher
- Git

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd spring-cloud-config-server
   ```

2. **Build the project:**
   ```
   mvn clean install
   ```

3. **Run the application:**
   ```
   mvn spring-boot:run
   ```

4. **Access the Config Server:**
   The server will be running on `http://localhost:8888` by default.

## Configuration

- The configuration properties for the server can be found in `src/main/resources/application.yml`.
- The `bootstrap.yml` file is used for application initialization.

## Testing

Unit tests for the application can be found in `src/test/java/com/example/configserver/ConfigServerApplicationTests.java`. You can run the tests using:
```
mvn test
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.