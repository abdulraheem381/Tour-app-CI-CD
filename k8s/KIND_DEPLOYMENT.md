# Kind Kubernetes Deployment Guide

## Prerequisites
- kind installed
- kubectl installed
- Docker installed

## Create Kind Cluster

```bash
kind create cluster --name tour-app
```

## Build Docker Images for Kind

Build both images locally:

```bash
# Build backend image
docker build -f server/Dockerfile -t tour-app-backend:latest .

# Build frontend image
docker build -f client/Dockerfile -t tour-app-frontend:latest .
```

## Load Images into Kind Cluster

```bash
kind load docker-image tour-app-backend:latest --name tour-app
kind load docker-image tour-app-frontend:latest --name tour-app
```

## Deploy to Kind

```bash
kubectl apply -f k8s/app-deployment.yaml
```

## Wait for Pods to be Ready

```bash
kubectl wait --for=condition=ready pod -l app=postgres --timeout=300s
kubectl wait --for=condition=ready pod -l app=backend --timeout=300s
kubectl wait --for=condition=ready pod -l app=frontend --timeout=300s
```

Or monitor with:
```bash
kubectl get pods -w
```

## Access Your App

**Frontend:** http://localhost:30080

**Check pod status:**
```bash
kubectl get pods
kubectl get svc
```

**View logs:**
```bash
# Backend logs
kubectl logs -f deployment/backend

# Frontend logs
kubectl logs -f deployment/frontend

# Database logs
kubectl logs -f deployment/postgres
```

## Port Forwarding (Alternative)

If you want to access backend directly:
```bash
kubectl port-forward svc/backend 5000:5000
```

## Cleanup

```bash
kind delete cluster --name tour-app
```

## Notes for Kind

- Images use `imagePullPolicy: Never` because they're loaded from Docker daemon
- Frontend accessible via NodePort on port 30080
- Backend accessible via ClusterIP (internal) on port 5000
- Database accessible via ClusterIP (internal) on port 5432
- All services are in the `default` namespace
