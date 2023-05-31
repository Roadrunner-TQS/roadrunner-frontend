FROM node:19-alpine AS build
WORKDIR /
COPY .  .

# Install dependencies
RUN npm i

# Build
CMD npm run build && npm run preview