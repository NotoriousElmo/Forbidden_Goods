# Use Node.js for frontend build
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY CTF_frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY CTF_frontend/ .
RUN npm run build

# Use Python for backend
FROM python:3.11-slim
WORKDIR /app

# Install Node.js and supervisord
RUN apt-get update && \
    apt-get install -y supervisor curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install serve globally
RUN npm install -g serve

# Copy frontend build
COPY --from=frontend-build /app/frontend/build /app/frontend/build

# Set up backend
WORKDIR /app/backend
COPY CTF_backend/requirements.txt .
RUN pip install -r requirements.txt uvicorn
COPY CTF_backend/ .

# Create supervisord configuration
RUN echo '[supervisord]\n\
nodaemon=true\n\
user=root\n\
\n\
[program:frontend]\n\
command=serve -s /app/frontend/build -l 3000\n\
environment=REACT_APP_API_URL=http://localhost:4000/v1\n\
autostart=true\n\
autorestart=true\n\
\n\
[program:backend]\n\
directory=/app/backend\n\
command=/usr/local/bin/uvicorn main:app --host 0.0.0.0 --port 4000 --log-level debug\n\
autostart=true\n\
autorestart=true\n\
stdout_logfile=/dev/stdout\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/stderr\n\
stderr_logfile_maxbytes=0' > /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 3000-4050

# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"] 