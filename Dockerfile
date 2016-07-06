FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY *.json /app/
RUN npm install
COPY *.js /app/
ENV PORT 3000
CMD ["node", "cluster"]
