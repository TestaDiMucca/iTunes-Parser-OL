# iTunes-Parser-OL
Parse an iTunes library into data that can be queried and visualized.

---

## Backend Spring Boot API

### Prerequisites
* Java 17+
* Maven 3.9+ (if not available, install from https://maven.apache.org or use an IDE that bundles it)

### Running locally
```bash
cd backend
mvn spring-boot:run
```
The API will start on `http://localhost:8080` and use a local SQLite file `database.db`.

### Endpoints
| Method | Path      | Auth | Description                                  |
|--------|-----------|------|----------------------------------------------|
| POST   | /register | ❌   | Create user – body `{ "username", "password" }` |
| POST   | /login    | ❌   | Authenticate – returns `{ "token" }` JWT      |
| GET    | /test     | ✅   | Requires `Authorization: Bearer <token>`      |

### Running tests
```bash
cd backend
mvn test
```

### Security Notes
* Passwords are salted & hashed with BCrypt.
* JWT secret and expiration are configured in `src/main/resources/application.properties`; change for production.

