FROM node:8.16.1-alpine
MAINTAINER _vae
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

RUN mkdir -p /node

WORKDIR /node

# add npm package
COPY package.json /node/package.json

RUN npm i --registry=https://registry.npm.taobao.org

# copy code
COPY . /node

EXPOSE 7001
# 启动node应用
CMD ["npm", "start"]
