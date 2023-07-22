pipeline {
    agent any

    environment {
        defaultRegion = "eu-west-1"
        registry = "092764866376.dkr.ecr.eu-west-1.amazonaws.com"
        registryCredential = "ecr:eu-west-1:awskey"
        dockerImage = ""
        clusterName = "note-app"
    }

    stages {
        stage('Clone sources') {
            steps{
            // git url: 'https://github.com/NaiveCoder1999/note-app.git'
                checkout scmGit(
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[credentialsId: 'githubtoken',
                    url: 'https://github.com/NaiveCoder1999/note-app.git']])
            }
        }

        stage("Building Image of Authorization Server") {
            steps{
                script {
                    dockerImage = docker.build("${registry}/note-auth:${env.BUILD_ID}",
                                   "-f ./springboot-note-authorization-server/jenkins.Dockerfile ./springboot-note-authorization-server")
                }
            }
        }

        stage("Pushing Authorization Server Image to ECR") {
            steps{
                script {
                    docker.withRegistry( registry, registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage("Building Image of Note API Service") {
            steps{
                withAWS(credentials: "awskey", region: "eu-west-1") {
                    script {
                        // dockerImage = docker.build registry + "/note-resource:${env.BUILD_NUMBER}", "-f springboot-note/aws.Dockerfile ./springboot-note"
                        dockerImage = docker.build("${registry}/note-resource:${env.BUILD_ID}",
                                   "-f ./springboot-note/jenkins.Dockerfile ./springboot-note")
                    }
                }
            }
        }

        stage("Pushing Note API Service Image to ECR") {
            steps{
                script {
                    docker.withRegistry( registry, registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage("Building React Frontend App Image") {
            steps{
                script {
                    dockerImage = docker.build("${registry}/note-react:${env.BUILD_ID}",
                                   "-f ./note-react-app/aws.Dockerfile ./note-react-app")
                }
            }
        }

        stage("Pushing React Frontend Image to ECR") {
            steps{
                script {
                    docker.withRegistry( registry, registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage("Update Authorization Server Service in ECS") {
            environment {
                TASK_FAMILY = "note-app-authorization-server"
                ECR_IMAGE = "${registry}/note-auth:${env.BUILD_NUMBER}"
                SERVICE_NAME = "note-app-AuthorizationserverService-YriQUnjCGrr6"
                }            
            steps {
                withAWS(credentials: "awskey", region: "eu-west-1") {
                    script {
                    sh '''
                        TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition "$TASK_FAMILY" --region "$defaultRegion")

                        NEW_TASK_DEFINTIION=$(echo $TASK_DEFINITION | jq --arg IMAGE "$ECR_IMAGE" '.taskDefinition | .containerDefinitions[1].image = $IMAGE | del(.taskDefinitionArn) | del(.revision) | del(.status) | del(.requiresAttributes) | del(.compatibilities) | del(.registeredAt) | del(.registeredBy)')

                        NEW_TASK_INFO=$(aws ecs register-task-definition --region "$defaultRegion" --cli-input-json "$NEW_TASK_DEFINTIION")

                        NEW_REVISION=$(echo $NEW_TASK_INFO | jq '.taskDefinition.revision')

                        aws ecs update-service --cluster ${clusterName} \
                                               --service ${SERVICE_NAME} \
                                               --task-definition ${TASK_FAMILY}:${NEW_REVISION}
                    '''
                    }
                    
                }
            }
        }

        stage("Update Note API Service in ECS") {
            environment {
                TASK_FAMILY = "note-app-api-service"
                ECR_IMAGE = "${registry}/note-resource:${env.BUILD_NUMBER}"
                SERVICE_NAME = "note-app-ApiserviceService-HUWgUYL8xoWS"
                }            
            steps {
                withAWS(credentials: "awskey", region: "eu-west-1") {
                    script {
                    sh '''
                        TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition "$TASK_FAMILY" --region "$defaultRegion")

                        NEW_TASK_DEFINTIION=$(echo $TASK_DEFINITION | jq --arg IMAGE "$ECR_IMAGE" '.taskDefinition | .containerDefinitions[1].image = $IMAGE | del(.taskDefinitionArn) | del(.revision) | del(.status) | del(.requiresAttributes) | del(.compatibilities) | del(.registeredAt) | del(.registeredBy)')

                        NEW_TASK_INFO=$(aws ecs register-task-definition --region "$defaultRegion" --cli-input-json "$NEW_TASK_DEFINTIION")

                        NEW_REVISION=$(echo $NEW_TASK_INFO | jq '.taskDefinition.revision')

                        aws ecs update-service --cluster ${clusterName} \
                                               --service ${SERVICE_NAME} \
                                               --task-definition ${TASK_FAMILY}:${NEW_REVISION}
                    '''
                    }
                    
                }
            }
        }

        stage("Update Frontend Service in ECS") {
            environment {
                TASK_FAMILY = "note-app-react-app"
                ECR_IMAGE = "${registry}/note-react:${env.BUILD_NUMBER}"
                SERVICE_NAME = "note-app-ReactappService-WYa497feT0sw"
                }            
            steps {
                withAWS(credentials: "awskey", region: "eu-west-1") {
                    script {
                    sh '''
                        TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition "$TASK_FAMILY" --region "$defaultRegion")

                        NEW_TASK_DEFINTIION=$(echo $TASK_DEFINITION | jq --arg IMAGE "$ECR_IMAGE" '.taskDefinition | .containerDefinitions[1].image = $IMAGE | del(.taskDefinitionArn) | del(.revision) | del(.status) | del(.requiresAttributes) | del(.compatibilities) | del(.registeredAt) | del(.registeredBy)')

                        NEW_TASK_INFO=$(aws ecs register-task-definition --region "$defaultRegion" --cli-input-json "$NEW_TASK_DEFINTIION")

                        NEW_REVISION=$(echo $NEW_TASK_INFO | jq '.taskDefinition.revision')

                        aws ecs update-service --cluster ${clusterName} \
                                               --service ${SERVICE_NAME} \
                                               --task-definition ${TASK_FAMILY}:${NEW_REVISION}
                    '''
                    }
                    
                }
            }
        }
    }
}
