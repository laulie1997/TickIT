# TickIT
Projektmanagement Software

## Database
Connect to local database:
1. Create database named _tickit_
2. Add the following configuration to `application.yml`.

```
spring:
  datasource:
    url: jdbc:mariadb://localhost:3306/tickit?useSSL=false
    username: DB_USER_NAME
    password: DB_USER_PASSWORD
```
