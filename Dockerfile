FROM node:24

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Install nodemon globally for development
RUN npm install -g nodemon

# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

EXPOSE 8085

# Development command with auto-rebuild and restart
CMD ["nodemon", "--watch", "src", "--ext", "ts", "--exec", "npm run build:backend && node dist/backend/app.js"]