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
# Asegúrate que el nombre coincida: AS builder -> --from=builder
# Y verifica que la carpeta sea 'open-mind-front/browser'
COPY --from=builder /app/dist/open-mind-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
