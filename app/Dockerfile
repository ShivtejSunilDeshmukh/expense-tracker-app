FROM node:22-alpine

# Install nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Copy backend dependency files
COPY backend/package.json ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --omit=dev

# Copy backend source
COPY backend/server.js .

# Copy frontend
COPY frontend /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create startup script
RUN printf '#!/bin/sh\n\
nginx\n\
node /app/backend/server.js\n' > /start.sh \
    && chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
