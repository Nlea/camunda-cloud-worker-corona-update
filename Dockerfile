FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm install -g ts-node 
RUN npm install -g typescript
COPY . .
CMD ["ts-node", "src/worker.ts"]
