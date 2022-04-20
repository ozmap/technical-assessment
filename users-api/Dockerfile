FROM node:16-alpine
# Create work directory that will contain source code and other details
WORKDIR /src
COPY package.json ./
RUN yarn install
# Bundle application source code
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]