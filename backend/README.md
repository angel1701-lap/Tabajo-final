# Backend - API REST

API REST construida con Node.js, Express y MySQL.

## Instalación

```bash
npm install
cp .env.example .env
```

## Configuración

Edita el archivo `.env` con tus credenciales de base de datos.

## Base de datos

Importa el esquema:
```bash
mysql -u root -p < database/schema.sql
```

## Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

Ver [API.md](../API.md) para documentación completa.
