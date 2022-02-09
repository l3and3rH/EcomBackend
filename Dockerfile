FROM node

WORKDIR /src

COPY ./ ./

CMD ["node", 'server.ts']