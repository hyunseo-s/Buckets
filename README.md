# Buckets

## Running the Frontend
```
cd frontend
npm run dev
```

## Running the Backend
```
cd backend
# if you don't have maven installed 
sudo apt-install maven
# double check your java version
java -version # should be openjdk 17
mvn clean package
docker compose-up --build
```

