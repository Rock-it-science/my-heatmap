FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY shared/package*.json ./shared/
COPY server/package*.json ./server/

RUN npm install

COPY shared/ ./shared/
COPY server/ ./server/

RUN npm run build -w server

FROM node:20-slim
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/server ./server

ENV NODE_ENV=production

ENV PORT=8085

EXPOSE 8085

CMD ["npm", "start", "-w", "server"]
