## TP2

`POSTGRES_USER=usr` is missing in env vars from docker-compose in `database` service.
If not set to `usr`, the api cannot connect to db because db is initialized with default login (of course not `usr`)

From:

```yaml
database:
  build: "database"
  environment:
    - POSTGRES_PASSWORD=pwd
  volumes:
    - db-volume:/var/lib/postgresql/data
  networks:
    - my-network
```

To:

```yaml
database:
  build: "database"
  environment:
    - POSTGRES_PASSWORD=pwd
    - POSTGRES_USER=usr ###############
  volumes:
    - db-volume:/var/lib/postgresql/data
  networks:
    - my-network
```

## TP3

1. in the front app, you have to edit the `VUE_APP_API_URL` in `.env.production` env var **before** building the docker image.
2. in the front app, the routes of api calls cannot finish with `/`: `http://${process.env.VUE_APP_API_URL}/departments/` => `http://${process.env.VUE_APP_API_URL}/departments`
