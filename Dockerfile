# build stage
FROM node:lts as build-stage

ENV DEBIAN_FRONTEND=noninteractive

#update apt-get
#update apt-get
RUN apt-get update && apt-get install -y \
    apt-utils \
    fonts-liberation \
    libappindicator3-1 \
    libatk-bridge2.0-0 \
    libatspi2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxtst6 \
    lsb-release \
    xdg-utils \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libxss1 \
    libasound2 \
    xvfb \
  && rm -rf /var/lib/apt/lists/*

# install chrome
RUN curl --silent --show-error --location --fail --retry 3 --output /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && ( dpkg -i /tmp/google-chrome-stable_current_amd64.deb ||  apt-get -fy install)  \
  && rm -rf /tmp/google-chrome-stable_current_amd64.deb \
  &&  sed -i 's|HERE/chrome"|HERE/chrome" --disable-setuid-sandbox --no-sandbox|g' \
          "/opt/google/chrome/google-chrome" \
  && google-chrome --version


RUN npm install -g aurelia-cli@1.3.1

RUN npm install typings -g

WORKDIR /app

# install dependencies
COPY ./*.json  ./

COPY external /app/external
COPY assets/dist/ /app/assets/dist/
COPY assets/fonts/ /app/assets/fonts/
COPY assets/icons/ /app/assets/dist/
COPY locales /app/locales

RUN rm -rf /app/package-lock.json

RUN npm install

COPY aurelia_project  ./aurelia_project



# Copy files in the root folder
COPY *.* ./

# Copy source files
COPY src ./src


# Copy test, unit & e2e
COPY test ./test

# build
FROM build-stage as publish-stage
RUN au build --env prod

# production stage
FROM nginx:alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html

RUN ls -la

COPY --from=publish-stage /app/scripts/ ./scripts/
COPY --from=publish-stage /app/index.html/ .
COPY --from=publish-stage /app/locales/ ./locales/
COPY --from=publish-stage /app/assets/ ./assets/

RUN ls -la

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
