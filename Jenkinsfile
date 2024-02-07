pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        DOCKER_IMAGE_NAME = 'mahithchigurupati/webapp-gcp'
        VERSION = "latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${VERSION}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-hub-credentials') {
                        docker.image(DOCKER_IMAGE_NAME).push("${VERSION}")
                    }
                    
                }
            }
        }

        stage('Install npx') {
            steps {
                script {
                    sh 'npm install -g npx'
                }
            }
        }

        stage('Semantic Release') {
            steps {
                script {
                    sh 'npx semantic-release'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}


