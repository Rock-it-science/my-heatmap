FROM node:24 AS base
WORKDIR /app
COPY package*.json ./

# Build Frontend
FROM base AS client-builder
WORKDIR /app/client
COPY client/ .
RUN npm install
RUN npm run build

# Build Backend
FROM base AS server-builder
WORKDIR /app/server
COPY server/ .
COPY prisma/ ../prisma
RUN npm install
RUN npm run build

# Compile outputted code
FROM node:24 AS app
WORKDIR /app
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package.json ./server/package.json
COPY --from=client-builder /app/client/dist ./client/dist
COPY prisma ./prisma
RUN npm install --prefix ./server --omit=dev

# Environment
ENV NODE_ENV=local
ENV PORT=8085

# Serve
EXPOSE 8085
CMD ["node", "server/dist/app.js"]