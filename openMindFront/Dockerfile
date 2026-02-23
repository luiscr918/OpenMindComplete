# -------- ETAPA 1: BUILD --------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos package.json primero
COPY package*.json ./

# Instalamos dependencias usando la bandera para saltar el conflicto
RUN npm install --legacy-peer-deps

# Copiamos el resto del proyecto
COPY . .

# Construimos Angular en modo producción
RUN npm run build -- --configuration production

# -------- ETAPA 2: SERVIDOR --------
FROM nginx:alpine

# Copiamos el build al servidor nginx
# Asegúrate que el nombre coincida: AS builder -> --from=builder
# Y verifica que la carpeta sea 'open-mind-front/browser'
COPY --from=builder /app/dist/openMindFront/browser /usr/share/nginx/html
# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
