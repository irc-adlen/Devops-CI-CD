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
          distribution: "corretto" # use the same distro as the "prod" env
          java-version: "21" # use java 21 as the "prod" env

      #finally build your app with the latest command
      - name: Build and test with Maven # name of the step
        run: mvn clean verify # action of the step
        working-directory: ./TP2/simple-api # directory where the action will be run
```

# 2-3 For what purpose do we need to push docker images?

In order to make them accessible to other people (colleges, public, friends,...)

# 2-4 Document your quality gate configuration.

1. create an organization on sonar
2. link the project by setting the SONAR_TOKEN in github secrets and editing the action in order to run the sonar anamysis

- optional: i can also create a separate action for sonar using the given configuration from sonar.


