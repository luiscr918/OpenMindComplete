# -------- ETAPA 1: BUILD --------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos package.json primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Construimos Angular en modo producción
RUN npm run build -- --configuration production

# -------- ETAPA 2: SERVIDOR --------
FROM nginx:alpine

# Copiamos el build al servidor nginx
COPY --from=build /app/dist/open-mind-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
