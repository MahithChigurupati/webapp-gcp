# WEBAPP

This repository contains the configuration files and commands for deploying the web application along with a PostgreSQL database using Kubernetes (K8s) and Docker.

## Docker Commands

To build and deploy Docker images, you can use the following commands:

```bash
# Build a Docker image
docker build .

# List all Docker images
docker image ls

# Remove a Docker image
docker image rm <image-id>

# Build a Docker image with a specific tag
docker build -t <name> .

# Run a Docker container in detached mode with a specific name
docker run -d --name <name> <image>

# List running Docker containers
docker ps

# List all Docker containers (including stopped ones)
docker ps -a

# Remove a Docker container forcefully
docker rm <container> -fv

# Run a Docker container with port mapping and detached mode
docker run -p <port>:<port> -d --name <name> <image>

# Run a Docker container with volume mapping and environment variables
docker run -v pathtofolderonlocation:pathtofolderoncontainer --env-file ./.env -p <port>:<port> -d --name <name> <image>

# Execute a shell inside a running Docker container
docker exec -it <container> bash

# List Docker volumes
docker volume ls

# Remove unused Docker volumes
docker volume prune

# Build and start Docker containers defined in a Compose file
docker-compose up -d --build

# Stop and remove Docker containers defined in a Compose file
docker-compose down -d -v

# Build and start Docker containers defined in multiple Compose files
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Stop and remove Docker containers defined in multiple Compose files
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v

# Print environment variables
printenv

# Inspect Docker objects like containers or images
docker inspect <>

# List Docker networks
docker network ls

# View logs from a Docker container
docker logs <container> -f

# Tag a Docker image with the Docker Hub repository name
docker image tag <image_name> <docker-hub-repo-name>

# Push a Docker image to Docker Hub
docker push <image>

# Build Docker containers defined in a Compose file
docker compose -f docker-compose.yml -f docker-compose.prod.yml build

# Build Docker containers for a particular service defined in a Compose file
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build <service>

```

## Kubernetes Commands

To deploy pods in Kubernetes, you can use the following commands:

```bash
# Apply the configuration map YAML file
kubectl apply -f postgres-config.yaml

# Get a list of all applied configmaps
kubectl get configmap

# Apply the persistent volume and persistent volume claim YAML file
kubectl apply -f postgres-pvc-pv.yaml

# Get a list of persistent volume claims
kubectl get pvc

# Apply the deployment YAML file
kubectl apply -f postgres-deployment.yaml

# Get a list of deployments
kubectl get deployments

# Apply the service YAML file
kubectl apply -f postgres-service.yaml

# Get details of all resources
kubectl get all

# Access the PostgreSQL database using psql
kubectl exec -it [pod-name] -- psql -h localhost -U admin --password -p 5432 postgresdb

# Create a new namespace
kubectl create namespace [namespace-name]

# Describe a resource (replace [resource-name] with the actual name)
kubectl describe [resource-type] [resource-name]

# Get detailed information about a specific pod
kubectl describe pod [pod-name]

# Get logs from a pod (replace [pod-name] with the actual pod name)
kubectl logs [pod-name]

# Delete a deployment (replace [deployment-name] with the actual name)
kubectl delete deployment [deployment-name]

# Apply a YAML file to update resources
kubectl apply -f [filename.yaml]

# Get a list of nodes
kubectl get nodes

# Get detailed information about a specific node
kubectl describe node [node-name]

# Check the status of Minikube
minikube status

# Start Minikube
minikube start

# Stop Minikube
minikube stop

# Delete Minikube
minikube delete

# Get a list of pods
kubectl get pods

# Get a list of deployments
kubectl get deployments

# Get a list of services
kubectl get svc

# Access a service deployed on Minikube
minikube service [service-name]

## Replace placeholders like [pod-name], [namespace-name], [deployment-name], and [service-name] with actual values.

```
