# Note Taking App



## Features



## Roadmap

- [x] Local Run with JAR and NPM
- [ ] Docker Compose
- [ ] Kubernetes
- [ ] Deployment + CI/CD



## Get Started

The **username** and **password** for demo: `guest`

### Dependencies:

JDK

```shell
openjdk version "17.0.7" 2023-04-18
OpenJDK Runtime Environment Temurin-17.0.7+7 (build 17.0.7+7)
OpenJDK 64-Bit Server VM Temurin-17.0.7+7 (build 17.0.7+7, mixed mode)
```

Maven

```shell
Apache Maven 3.9.2 (c9616018c7a021c1c39be70fb2843d6f5f9b8a1c)
Maven home: /opt/homebrew/Cellar/maven/3.9.2/libexec
Java version: 17.0.7, vendor: Eclipse Adoptium
```

NPM

```shell
npm version
{
  npm: '9.2.0',
  node: '16.16.0'
  #...
}
```



### Local Build

#### Create and Running JAR

```shell
# Open another terminal window
# to build and execute the authorizaton server
mvn -f springboot-note-authorization-server/ package
mvn -f springboot-note-authorization-server/ spring-boot:run

# Under root folder: note-app
# to build and execute the resource server
mvn -f springboot-note/ package
mvn -f springboot-note/ spring-boot:run
```

#### Running React Frontend

1. Install dependency packages(should be run under `note-react-app` directory):
   Run `npm install`
2. Run localhost server. 
   Run `npm start`



### Screenshots

- Homepage

<img src=".//docs/images/index.jpg" alt="index" style="zoom: 33%;" />



- Note list

<img src=".//docs/images/noteList.jpg" alt="index" style="zoom: 33%;" />



- User Profile

<img src=".//docs/images/profilePage.jpg" alt="index" style="zoom: 33%;" />



- Note Preview

<img src=".//docs/images/notePreview.jpg" alt="index" style="zoom: 33%;" />



- Note Creating and Updating

<img src=".//docs/images/noteEditor.jpeg" alt="index" style="zoom: 33%;" />



- Logout Confirmation

<img src=".//docs/images/logoutBox.jpg" alt="index" style="zoom: 33%;" />