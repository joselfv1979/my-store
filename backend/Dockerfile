FROM node:18
WORKDIR /app
COPY . /api
WORKDIR /api
RUN npm install
COPY . .
EXPOSE 7000
CMD ["npm", "start"]