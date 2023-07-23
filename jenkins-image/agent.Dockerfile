FROM jenkins/ssh-agent:latest-jdk17
RUN apt-get update && apt-get install -y jq
RUN apt-get update && apt-get install -y curl
RUN apt-get update && apt-get install -y unzip
# AWS CLI installation commands
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && ./aws/install