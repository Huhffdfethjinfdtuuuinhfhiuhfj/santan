FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
VOLUME ["/app/session"]
CMD ["node", "index.js"]
