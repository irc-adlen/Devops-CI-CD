# 1-1 Why should we run the container with a flag -e to give the environment variables? --> Why env vars ?

In order to customize some settings from the image

# 1-2 Why do we need a volume to be attached to our postgres container?

In order to persist data across container restart

# 1-3 Document your database container essentials: commands and Dockerfile.

### --> Base image

`FROM postgres:14.1-alpine`

### every sql script inside the docker-entrypoint-initdb.d's folder will be executed in alphabetical order

### so by copying the sql scripts, they will be executed

```sh
COPY ./01-CreateScheme.sql /docker-entrypoint-initdb.d/01-CreateScheme.sql
COPY ./02-InsertData.sql /docker-entrypoint-initdb.d/02-InsertData.sql
```

`docker run -p 5432:5432 -e POSTGRES_DB=db -e POSTGRES_USER=usr -e POSTGRES_PASSWORD=pwd -v C:\Users\PlanetDestroyer\Documents\Code\Devops-CI-CD\TP1\db\data:/var/lib/postgresql/data --name tp1db --network app-network krateros/dbtp1`
- `-p`: port
- `-e`: env vars
- `-v`: mapped volume
- `--name`: given container name
- `--network`: network where the container will run
- `krateros/dbtp1`: image name

# 1-4 Why do we need a multistage build? And explain each step of this dockerfile.
- to reduce image size: just keep the run environment instead of all the build one and maybe the test one too
- to have a clean Dockerfile: each step is sperated

1. Build the image
2. From the build env, only copy the jar file and execute it

