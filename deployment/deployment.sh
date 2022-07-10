#!/bin/bash

# Remove Current Deployment if Exist
kubectl delete -f ./nodeapp-secret.yml
kubectl delete -f ./nodeapp-deployment.yml
kubectl delete -f ./mongo-deployment.yml
kubectl delete -f ./mongo-secret.yml

# Build node app image
docker build ../src -t be-test/node-app

# Apply Deployment
kubectl apply -f ./nodeapp-secret.yml
kubectl apply -f ./nodeapp-deployment.yml
kubectl apply -f ./mongo-deployment.yml
kubectl apply -f ./mongo-secret.yml

# Check Deployment
node_app=`kubectl get pods | grep 'node-app' | awk '{print $1}'`
mongo=`kubectl get pods | grep 'mongo' | awk '{print $1}'`

kubectl get pods $node_app $mongo
