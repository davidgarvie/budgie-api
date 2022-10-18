up:
	docker-compose -p budgie -f ./docker/docker-compose.yml up -d --build

down: 
	docker-compose -f ./docker/docker-compose.yml down

up-prod:
	docker-compose -p budgie -f ./docker/docker-compose.prod.yml up -d --build

down-prod:
	docker-compose -f ./docker/docker-compose.prod.yml down
