FROM node:20-alpine

WORKDIR /app

# Install typescript globally
RUN npm install -g typescript

# Default command, can be overridden in docker-compose
CMD ["sh"]
