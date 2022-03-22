FROM node:lts as dependencies
WORKDIR /
COPY package.json package-lock.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /node_modules /app/node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /app
# ENV NODE_ENV production
#If you are using a custom next.config.js file, uncomment this line.
#COPY --from=builder /app/next-i18next.config.js ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.env.develop ./.env.develop
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder /app/.env.test ./.env.test

EXPOSE 3000
CMD ["npm", "start"]
