FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY ./src/prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]