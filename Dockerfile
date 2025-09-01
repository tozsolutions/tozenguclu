FROM nginx:1.27-alpine

# Copy the static website files
COPY . /usr/share/nginx/html

# Remove unnecessary files from the container
RUN rm -rf /usr/share/nginx/html/.git \
    /usr/share/nginx/html/.github \
    /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/package.json \
    /usr/share/nginx/html/.eslintrc.json \
    /usr/share/nginx/html/DEPLOYMENT_GUIDE*.txt \
    /usr/share/nginx/html/ICERIK_OZETI*.txt \
    /usr/share/nginx/html/.gitignore

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install wget for health check
RUN apk add --no-cache wget

# Create non-root user for security
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

USER nginx
