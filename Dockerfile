FROM snn2spade/node-with-git:8.15.1-slim

ADD .build/meteor-react-template.tar.gz ./code
COPY /.git /code/bundle/.git/

WORKDIR /code/bundle/programs/server/
RUN ls -la

RUN npm install --production

WORKDIR /code/bundle
EXPOSE 8080

CMD [ "node", "main.js" ]
