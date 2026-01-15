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

## Access Your App (RHEL)

**Option 1: Port Forward (Recommended for RHEL)**
```bash
kubectl port-forward svc/frontend 30080:80
```
Then access: http://localhost:30080

**Option 2: Get Kind Node IP**
```bash
KIND_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
echo "Access frontend at: http://$KIND_IP:30080"
```

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

## Port Forwarding

Forward individual services:
```bash
# Frontend
kubectl port-forward svc/frontend 30080:80

# Backend
kubectl port-forward svc/backend 5000:5000

# Database
kubectl port-forward svc/postgres 5432:5432
```

## Cleanup

```bash
kind delete cluster --name tour-app
```

## Notes for Kind on RHEL

- Images use `imagePullPolicy: Never` because they're loaded from Docker daemon
- Frontend accessible via NodePort on port 30080 (use port-forward or kind node IP)
- Backend accessible via ClusterIP (internal) on port 5000
- Database accessible via ClusterIP (internal) on port 5432
- All services are in the `default` namespace
- For RHEL, port-forward is the most reliable method: `kubectl port-forward svc/frontend 30080:80`
