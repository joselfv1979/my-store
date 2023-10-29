FROM node:18
WORKDIR /app
COPY backend/ /api
WORKDIR /api
RUN npm install
COPY . .
EXPOSE 7000
CMD ["npm", "start"]