# TickIT
Projektmanagement Software

## Lokales Starten der Anwendung 
Für das lokale Starten der Anwendung kann der Quellcode aus dem TickIT GitHub Repository heruntergeladen bzw. geklont werden.
### Voraussetzungen
- Java Version: 17
- Angular CLI 15.2.7
- Node.js
- Node Package Manager
- MariaDB

### Datenbank
Der Server speichert alle Daten der Anwendung in einer MariaDB. Für die Konfiguration werden eine Datenbank und ein Benutzer mit den erforderlichen Lese- und Schreibrechten benötigt. 
In der application.yml Datei der Anwendung wird der Datenbankzugriff wie folgt konfiguriert:

```
spring:
  datasource:
    url: jdbc:mariadb://localhost:3306/tickit?useSSL=false
    username: DB_USER_NAME
    password: DB_USER_PASSWORD
```

### Server
Durch das Starten der Hauptklasse wird die Spring Boot-Anwendung initialisiert, die erforderlichen Abhängigkeiten werden geladen und die Anwendung steht zur Interaktion bereit.
Die Spring-Boot Anwendung kann direkt über eine Konfiguration in der IDE (z.B. IntelliJ) im Menü gestartet werden. Falls diese nicht automatisch generiert wird, kann die Anwendung über einen Rechtsklick in der TickitApplication Klasse gestartet werden. 

### Web-Oberfläche
Wie auch der Server kann der Client auch über das Menü in IntelliJ gestartet werden. Alternativ kann über die Kommandozeile der Befehl ng serve ausgeführt werden.

## Starten der JAR-Datei
Die gebaute Anwendung kann über die beiliegende JAR-Datei im build Verzeichnis gestartet werden. Die Datenbankverbindung wird ebenfalls für eine application.yml Datei hergestellt.Hierbei ist zu beachten, dass sich diesei im selben Verzeichnis befinden muss.
Die Anwendung lässt sich anschließend über den folgenden Befehl starten.

```
java -jar app-0.0.1-SNAPSHOT.jar
```
