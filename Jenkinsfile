pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        DOCKER_IMAGE_NAME = 'mahithchigurupati/webapp-gcp'
        TAG = "latest"
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
                    docker.build("${DOCKER_IMAGE_NAME}:${TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS) {
                        docker.image("${DOCKER_IMAGE_NAME}:${TAG}").push()
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Docker image build and push successful!'
        }
        failure {
            echo 'Docker image build or push failed!'
            currentBuild.result = 'FAILURE'
        }
    }
}
