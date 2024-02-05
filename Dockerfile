
FROM node:21.6-alpine3.19

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY next-app/package.json next-app/package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
  fi

CMD ["npm", "run", "dev"]