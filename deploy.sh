#!/bin/bash

ecr=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com
image=${ecr}/midxfrontend:latest

# login
aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${ecr}

# build and push image
docker build -t ${image} .
docker push ${image}

# force new deploy all services in ECS
services=$(aws ecs list-services --cluster midxfrontend --output json | jq -r '.serviceArns[]')
# Iterate through each service and force a new deployment
for service in $services; do
    aws ecs update-service --cluster midxfrontend --service $service --force-new-deployment
done