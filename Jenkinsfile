pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        DOCKER_IMAGE_NAME = 'mahithchigurupati/webapp-gcp'
        VERSION = "latest"
        GH_TOKEN = credentials('GITHUB_TOKEN')

    }

    tools {
        nodejs 'nodejs'
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

        stage('Semantic Release') {
            steps {
                script {
                    sh 'npm install -g semantic-release'
                    sh 'semantic-release'

                    // Extract the version determined by semantic-release
                    def version = sh(returnStdout: true, script: 'semantic-release --dry-run | grep "Release version" | cut -d \':\' -f 2').trim()

                    // Ensure the version adheres to Docker image tag pattern
                    version = version.replaceAll(/[^a-zA-Z0-9_.-]/, '_')

                    // Tag the Docker image with the semantic version
                    docker.image("${DOCKER_IMAGE_NAME}:${version}").tag("${DOCKER_IMAGE_NAME}:latest")
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


