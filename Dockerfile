# 1. ETAPA DE CONSTRUCCIÓN (BUILDER)
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala todas las dependencias (incluyendo las de desarrollo para la compilación)
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Ejecuta la compilación de NestJS
RUN npm run build

# 2. ETAPA DE PRODUCCIÓN (FINAL)
FROM node:20-alpine AS production

# Establece variables de entorno
ENV NODE_ENV production
WORKDIR /usr/src/app

# Copia SOLO las dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copia el código compilado desde la etapa 'builder'
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/dist /usr/src/app/dist

# Expone el puerto (ejemplo: 3000)
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD [ "node", "dist/main" ]