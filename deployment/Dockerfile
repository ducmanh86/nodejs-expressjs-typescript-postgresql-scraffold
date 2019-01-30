FROM node:lts-alpine

ENV TZ 'Asia/Ho_Chi_Minh'
RUN rm /etc/localtime && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

# Create working directory
WORKDIR /usr/src/app

# Copy source to image
COPY . .

RUN npm install --only=prod
RUN npm install pm2 -g
RUN pm2 install typescript
RUN pm2 install pm2-logrotate
RUN npm run db:migrate -- --env production

EXPOSE 3000
