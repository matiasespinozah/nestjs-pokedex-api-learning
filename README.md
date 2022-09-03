<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repositorio
2. Ejecutar

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar base de datos

```
docker-compose up -d
```

5. Clonar el archico `.env.template` y renombrar la copia a `.env`

6. Llenar las variables de entorno definidas en el `.env`

7. Ejecutar la aplicación de desarrollo

```
yarn start:dev
```

8. Recontruir base de datos con la semilla

```
http://localhost:3000/api/v2/seed
```

# Production Build

1. crear el archivo `.env.prod`
2. Llenar las variables de entorno para producción
3. Construir la nueva imagen y correr la aplicación de producción

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

## Stack usado

- MongoDB
- NestJS
