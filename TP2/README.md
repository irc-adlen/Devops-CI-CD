# 2-1 What are testcontainers?

Docker Containers for testing:

- testcontainers: core Testcontainers library.
- jdbc: support for using Testcontainers with JDBC-based databases.
- postgresql: run a PostgreSQL database inside a container for testing.

# 2-2 Document your Github Actions configurations.

```yaml
name: CI devops 2025 # Name of the pipeline
on:
  #to begin you want to launch this job in main and develop
  push:
    branches: [main, develop] # run on push on develop and main branches
  pull_request: # does not run on pull request

jobs:
  test-backend:
    runs-on: ubuntu-22.04 # pipeline run in a ubuntu 22.04 virtual device
    steps:
      #checkout your github code using actions/checkout@v2.5.0
      - uses: actions/checkout@v4 # first step to be runned

      #do the same with another action (actions/setup-java@v3) that enable to setup jdk 21
      - name: Set up JDK 21 # name of the step
        uses: actions/setup-java@v4 # action of the step
        with: # settings of the action
          distribution: "corretto"
          java-version: "21"

      #finally build your app with the latest command
      - name: Build and test with Maven
        run: mvn clean verify
        working-directory: ./TP2/simple-api
```
