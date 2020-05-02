---
layout: post
title: "Prometheus Kubernetes directory: open /data/lock: permission denied"
comments: true
date: "2020-04-26 04:13:41.695000+00:00"
categories:  [caveat]
tags:  [kubernetes, helm, linux]
---




https://github.com/helm/charts/issues/15742#issuecomment-517012778


`kubectl logs  prometheus-server-746f5c479b-cx7dj -c prometheus-server`

**directory: open /data/lock: permission denied**


https://github.com/helm/charts/issues/15665


`kubectl scale deployment/prometheus-server --replicas=0`


```bash
cat <<EOF > pod.yaml
kind: Pod
apiVersion: v1
metadata:
  name: tmp-pod
spec:
  containers:
  - name: tmp-pod
    image: ubuntu
    command: ["/bin/sh", "-c", "sleep 3600;"]
    volumeMounts:
      - mountPath: /data
        name: storage-volume
  restartPolicy: Never
  volumes:
  - name: storage-volume
    persistentVolumeClaim:
      claimName: prometheus-server
EOF
kubectl apply -f pod.yaml
```

`kubectl exec -ti tmp-pod bash`

`chown -R 65534:65534 /data`

`kubectl delete pod tmp-pod`

`kubectl scale deployment/prometheus-server --replicas=1`

