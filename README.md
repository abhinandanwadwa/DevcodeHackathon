# LinodeCode

## Grow, Share And Connect With Developers

![Logo](images/devcode.png)

![Banner](images/banner.png)

Visit At <a href="https://linodecode.stonecss.com" target="_blank">linodecode.stonecss.com</a>

## Deployment

### Deploying Backend

To deploy the backend. Create a new Kubernetes Cluster on Linode along with a Managed Postgres Database and Linode Object Storage. Then run the following commands. Ensure you have `kubectl` installed.

Make a new folder called `manifests` and run the following commands.

```bash
mkdir manifests
```

```bash
cd manifests
```

Make a new file named `devcode-deployment.yaml`, inside it and paste the following content in it.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devcode
  labels:
    app: devcode
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devcode
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 4
  template:
    metadata:
      labels:
        app: devcode
    spec:
      containers:
        - name: devcode
          image: abhinandan1311/devcodeproduction:final
          ports:
            - containerPort: 8181
          env:
            - name: JWT_SECRET
              value: "JWT_SECRET"
            - name: pgPassword
              value: "POSTGRES_PASSWORD"
            - name: LINODE_ACCESS_KEY_ID
              value: "OBJECT_STORAGE_ACCESS_ID"
            - name: LINODE_SECRET_ACCESS_KEY
              value: "OBJECT_STORAGE_SECRET_KEY"
```

Make another file called `node_service.yaml` and paste the following content in it.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: devcode-service-node
  labels:
    app: devcode
spec:
  selector:
    app: devcode
  type: NodePort
  ports:
  - name: http
    port: 8181
    targetPort: 8181
    nodePort: 30001
```

Make another file called `service.yaml` and paste the following content in it.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: devcode-service
  labels:
    app: devcode
spec:
  selector:
    app: devcode
  type: ClusterIP
  ports:
    - port: 8181
      targetPort: 8181
      protocol: TCP
```

Run the following commands.

```bash
kubectl apply ./ --kubeconfig {your_kubeconfig_file_location}
```


### Deploying Frontend

To deploy the frontend. Make a new Linux Linode. Install Nginx and NodeJS. Then run the following commands.

```bash
  git clone https://github.com/abhinandanwadwa/DevcodeHackathon.git
```

```bash
  cd frontend
```

```bash
  npm install
```

```bash
  npm run build
```

```bash
  sudo cp -rf build /var/www/html
```

```bash
  sudo vim /etc/nginx/sites-available/default
```

Edit the file and change the following section to this

```
    server {
            listen 80 default_server;
            listen [::]:80 default_server;

            root /var/www/html/build;

            index index.html index.htm index.nginx-debian.html;

            server_name _;

            location / {
                    try_files $uri $uri/ /index.html;
            }
    }
```

```bash
  sudo service nginx restart
```

Navigate to `http://youripaddress`
