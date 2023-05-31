FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json /app

# Install dependencies
RUN npm i

# Copy source code
ADD . /app

# Build
RUN npm run build

# Serve
CMD ["npm", "run", "preview"]