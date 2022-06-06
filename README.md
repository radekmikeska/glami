# Install
```bash
$ cd graphql-server && yarn
$ cd web-application && yarn
```

# Run
```bash
$ docker compose up -d mongo
# wait till mongo is running
$ docker compose up -d
```

# App
| app type | url |
| -------- | --- |
| web app | http://localhost:3000 |
| graphql server| http://localhost:5000 |
| mongo express | http://localhost:8082 |