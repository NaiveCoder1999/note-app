FROM jenkins/ssh-agent:latest-jdk17
RUN apt-get update && apt-get install -y jq