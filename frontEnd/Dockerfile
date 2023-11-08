FROM node:16-alpine
WORKDIR /exam-fe
COPY . .
RUN yarn install
ENV REACT_APP_SHORTY_API=http://localhost:9000
EXPOSE 3000
RUN yarn build
RUN yarn global add serve
CMD serve -s build