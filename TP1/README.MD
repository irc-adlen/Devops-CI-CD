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

# 1-5 Why do we need a reverse proxy?

Due to:

- security: SSL
- high-availability: load-balancing
- centralized authentication/authorization: one server for all apps

# 1-6 Why is docker-compose so important?

To orchestrate containers in a smooth way.

# 1-7 Document docker-compose most important commands.

`docker compose up`: run all containers in the docker-compose.yml
`docker compose up -d`: run all containers in the docker-compose.yml in background
`docker compose up --build`: run all containers in the docker-compose.yml and rebuild images if Dockerfile

# 1-8 Document your docker-compose file.

```yaml
services:
  backtp1: # a service, the name is also a dns record inside the network
    build: "backend/simple-api-student-main" # the path where the Dockerfile is located in order to build the image.
    networks:
      - my-network # the service will be part of this network
    depends_on:
      - tp1db
      # the service will depends on tp1db service, if tp1db failed to start, the service will not be built
      # If tp1db is build successfully, the service will be built right after.

  tp1db: # a service, the name is also a dns record inside the network
    build: "db" # the path where the Dockerfile is located in order to build the image.
    networks:
      - my-network # the service will be part of this network
    volumes:
      - ./db/data:/var/lib/postgresql/data # to bind folders or file in the host machine for persistance in this way: <host>:<container>

  httptp1: # a service, the name is also a dns record inside the network
    build: "http" # the path where the Dockerfile is located in order to build the image.
    ports:
      - "80:80" # to map a port from the container to the host machine in that way: <host>:<container>
    networks:
      - my-network # the service will be part of this network
    depends_on:
      - backtp1
      # the service will depends on backtp1 service, if backtp1 failed to start, the service will not be built.
      # If backtp1 is build successfully, the service will be built right after.

networks:
  my-network: # to create a network named "my-network"
```

# 1-10 Why do we put our images into an online repo?

To make them publicy avaiable. Or to access it all the time (internet connection is mendatory)
