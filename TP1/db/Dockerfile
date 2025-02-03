FROM postgres:14.1-alpine

COPY *.sql /docker-entrypoint-initdb.d

# docker run -p 5432:5432 -e POSTGRES_DB=db -e POSTGRES_USER=usr -e POSTGRES_PASSWORD=pwd -v C:\\Users\\PlanetDestroyer\\Documents\\Code\\Devops-CI-CD\\TP1\\db\\data:/var/lib/postgresql/data --name tp1db --network app-network krateros/dbtp1