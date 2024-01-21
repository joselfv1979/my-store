# building

FROM node:18-alpine AS builder
WORKDIR /usr/app
# Cache and Install dependencies
COPY package.json .
RUN npm install
# Copy app files
COPY . /usr/app
RUN npm ci
RUN npm run build

# hosting

# Bundle static assets with nginx
FROM nginx:alpine
# Copy built assets from builder
COPY --from=builder /usr/app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]