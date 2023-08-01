<h2 align="center">
<span>Note Taking App</span>
</h2>
<p align="center">
  <em>A Full-Stack Application to validate OAuth authorization-code flow with PKCE and to manage notes.</em>
</p>
<p align="center">
  <a href="http://note-loadb-1153hxl66luz-dfb9d722b8f996bd.elb.eu-west-1.amazonaws.com/"><b>🌐LIVE DEMO</b></a> 
</p>

The goal of this project is to implement an application called `note-app` to manage notes taking. For it, we will implement a back-end [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/) application called `springboot-note` to provice REST APIs for resource access and a font-end [ReactJS](https://react.dev/) application called `note-react-app` to provide browser access. Besides, we will use  [OAuth 2.0](https://www.oauth.com/) and [JWT Authentication](https://jwt.io/introduction) supported by [Spring Authorization Server]( https://docs.spring.io/spring-authorization-server/docs/current/reference/html/overview.html) secure both applications.

## Get Started

- Online Service

  - **Check the** 🌐 **[LIVE DEMO on AWS ECS ](http://note-loadb-1153hxl66luz-dfb9d722b8f996bd.elb.eu-west-1.amazonaws.com/)** (Please make sure Port 8080 and 8090 is not blocked on your network). The **username** and **password** are `guest`
  - The other users/passwords are:`coder` and `nocoder`.

- Local Service

  - Make sure Docker is installed, then in a terminal, make sure you are inside `note-app` root folder. Run the following command to start docker compose containers:

    ```shell
    docker compose up -d
    ```
    
    Then access http://127.0.0.1/ in browser
  - To stop and remove docker-compose containers and network, in the terminal and inside `note-app` folder, run the command below
  
    ```shell
    docker compose down -v
    ```

- CI/CD pipeline status
  - The `note-app-update-pipeline` can be viewed on http://172.96.205.185:8080/

## Features

- Login/Logout with OAuth 2 Authorization Code Flow with PKCE
- CRUD for note-taking
- WYSIWYG text editor and syntax highlighter for code snippets

## Roadmap

- [x] Local Run with JAR and NPM
- [x] Docker Compose
- [x] AWS Deployment + Jenkins CI/CD pipeline
- [ ] Kubernetes Deployment

## Development

### Prerequisites

- [`npm (16.16.0)`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- [`JDK 17+`](https://adoptium.net/en-GB/temurin/releases/)

- [`Maven`](https://maven.apache.org/install.html)

- [`Docker`](https://www.docker.com/)

- [`Docker Compose`](https://docs.docker.com/compose/install/)

### authorization-server

- Open a terminal and navigate to `note-app/springboot-note-authorization-server` folder

- Run the following `Maven` command to start the application

  ```shell
  ./mvnw package
  ./mvnw clean spring-boot:run
  ```
  
- This folder also can be opened as Jetbrains IDEA project for development.

### **api-service**

- Open a terminal and navigate to `note-app/springboot-note` folder

- Run the following `Maven` command to start the application

  ```shell
  ./mvnw package
  ./mvnw clean spring-boot:run
  ```

- This folder also can be opened as Jetbrains IDEA project for development.

### react-app

- Open another terminal and navigate to `note-app/note-react-app/` folder

- Run the command below if you are running the application for the first time

  ```shell
  npm install
  ```

- Run the `npm` command below to start the application

  ```shell
  npm start
  ```

## Screenshots

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

## License

[GNU General Public License v3.0](./LICENSE)