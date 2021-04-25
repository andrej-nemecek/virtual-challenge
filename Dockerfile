# build stage
FROM node:14 as build-stage

WORKDIR /app

# ---------- Build stage ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with TypeScript

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build:ts
RUN npm run build:scss
RUN npm run build:css

# Remove dev dependencies
RUN npm prune --production

# ---------- Release stage ----------

FROM node:14 as production-stage

WORKDIR /app

COPY . .
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/static/css ./static/css

RUN chown -R node:node /app
USER node

EXPOSE 3005
CMD [ "node", "dist/index.js" ]