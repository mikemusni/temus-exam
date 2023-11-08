# Welcome to the Shorty app

### Prerequisites
* Docker
* Terminal
* Postman

### API documentation
https://documenter.getpostman.com/view/3620091/2s9YXh5NWF
<br>

### The project is available to the public
Please visit https://exam-temus-web.musni.net

### Follow the 5 simple steps
It is <u>important</u> to follow the sequence of each steps to setup all the environment properly.
<br>
## Step 1: Download or Clone the Repository
```
git clone git@github.com:mikemusni/temus-exam.git
```
## Step 2: Build Docker Images for Each Folder
Note: In your terminal you must be in the root directory of the project.\
`cd temus-Exam`

/backEnd:
```
docker build -t mikemusni/backend:latest ./backEnd
```
/frontEnd:
```
docker build -t mikemusni/frontend:latest ./frontEnd
```
/postgres:
```
docker build -t mikemusni/postgres ./postgres
```
* If you have done this correctly, you should have additional 3 images in your Docker. You may run the command `docker container ls` to confirm the images. (or use the docker desktop application)

## Step 3: Create a Docker Network
```
docker network create --driver bridge --subnet 192.168.2.0/24 --gateway 192.168.2.1 mikemusni-net
```
* Run the command `docker network ls`, and you should have an additional network ID called `mikemusni-net`

## Step 4: Run All Docker Containers for Each Folder
Note: Postgres must be executed first before everything else; otherwise, the other containers will not be created.\
<br>
/postgres:
```
docker run --name mikemusni-postgres --net mikemusni-net --ip 192.168.2.2 -p 5432:5432 -e POSTGRES_PASSWORD=root -d mikemusni/postgres
```
/backEnd:
```
docker run --name mikemusni-backend --net mikemusni-net --ip 192.168.2.3 -p 9000:9000 -d mikemusni/backend
```
/frontEnd:
```
docker run --name mikemusni-frontend --net mikemusni-net --ip 192.168.2.5 -p 3000:3000 -d mikemusni/frontend
```
* Run the command `docker ps` and you should see 3 new containers running. You can view the frontend by visiting the page http://localhost:3000
## Step 5: Run the TypeORM Migration Script for Backend application
```
docker exec -it mikemusni-backend yarn typeorm:migrate
```
<br/><br/>
## How to start the unit test?
/backEnd:
```
yarn test
```
/frontEnd:
```
yarn test
```
