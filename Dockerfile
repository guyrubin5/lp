#FROM gatsbyjs/gatsby:latest as gatsby

FROM node:lts

# RUN apk add --update-cache git \
#   && rm -rf /var/cache/apk/*

RUN apt-get update && apt-get install -y \
  rsync \
  && rm -rf /var/lib/apt/lists/*

#EXPOSE 80
#EXPOSE 8000
#EXPOSE 9000
EXPOSE 8055

#COPY --from=gatsby /sbin/nginx-boot /sbin/nginx-boot
#RUN chmod +x /sbin/nginx-boot

RUN mkdir -p /app
WORKDIR /app

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

RUN yarn install --no-cache --pure-lockfile
RUN yarn global add now

COPY src /app/src
COPY babel.config.js /app/babel.config.js
COPY gatsby-node.js /app/gatsby-node.js
COPY gatsby-config.js /app/gatsby-config.js
COPY gatsby-browser.js /app/gatsby-browser.js
COPY gatsby-ssr.js /app/gatsby-ssr.js
COPY postcss.config.js /app/postcss.config.js
COPY .env.production /app/.env.production
COPY now.json /app/now.json
COPY .now /app/.now
COPY hooker.js /app/hooker.js

#RUN echo "10.0.20.5 learningpeople.inno" >> /etc/hosts && \
#    yarn run build

#RUN cp -r /app/public /pub

ENTRYPOINT ["node", "/app/hooker.js"]

