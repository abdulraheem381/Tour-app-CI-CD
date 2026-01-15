# PostgreSQL Kubernetes Deployment

## Overview
This deployment provides a PostgreSQL database setup for the Senior-DevOps project on Kubernetes.

## Files Included

1. **postgres-secret.yaml** - Stores database credentials
2. **postgres-pvc.yaml** - Persistent storage for database data
3. **postgres-service.yaml** - Exposes PostgreSQL within the cluster
4. **postgres-deployment.yaml** - Main PostgreSQL deployment
5. **postgres-all.yaml** - Combined manifest (recommended for single apply)

## Deployment Instructions

### Prerequisites
- Kubernetes cluster running (1.20+)
- kubectl configured
- Storage class available (or default storage class)

### Deploy

Deploy using the combined manifest:
```bash
kubectl apply -f k8s/postgres-all.yaml
```

Or deploy individual manifests:
```bash
kubectl apply -f k8s/postgres-secret.yaml
kubectl apply -f k8s/postgres-pvc.yaml
kubectl apply -f k8s/postgres-service.yaml
kubectl apply -f k8s/postgres-deployment.yaml
```

### Verify Deployment

```bash
# Check pod status
kubectl get pods -l app=postgres

# Check service
kubectl get svc postgres

# Check PVC
kubectl get pvc postgres-pvc

# View logs
kubectl logs deployment/postgres

# Describe pod
kubectl describe pod -l app=postgres
```

### Connect to Database

From inside the cluster:
```
Host: postgres
Port: 5432
Username: postgres (from secret)
Password: postgres-password-change-me (from secret)
Database: tours_db
```

From outside the cluster (port-forward):
```bash
kubectl port-forward svc/postgres 5432:5432
# Then connect to localhost:5432
```

### Configuration

**Update credentials:**
Edit `postgres-secret.yaml` before deploying:
```yaml
stringData:
  POSTGRES_USER: your_username
  POSTGRES_PASSWORD: your_strong_password
  POSTGRES_DB: your_db_name
```

**Change storage size:**
Edit `postgres-pvc.yaml`:
```yaml
storage: 20Gi  # Change to desired size
```

**Update resource limits:**
Edit `postgres-deployment.yaml` to adjust CPU and memory requests/limits.

## Environment Variables for Application

After deployment, set these environment variables in your app deployment:

```
DATABASE_URL=postgresql://postgres:postgres-password-change-me@postgres:5432/tours_db
```

## Cleanup

```bash
kubectl delete -f k8s/postgres-all.yaml
```

⚠️ **Warning:** This will delete the deployment, but the PVC will remain. To remove PVC:
```bash
kubectl delete pvc postgres-pvc
```
