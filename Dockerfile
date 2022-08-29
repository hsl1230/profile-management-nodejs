# syntax=docker/dockerfile:1
ARG node_version="18-alpine"
FROM node:${node_version}

ARG work_dir="profile-management"
RUN mkdir $work_dir
WORKDIR /${work_dir}
COPY . ./
#RUN apk add --no-cache python2 g++ make
RUN ["npm", "install"]
ENV PORT=3100
ENTRYPOINT ["node", "dist/main.js"]
CMD ["node", "dist/main.js"]
EXPOSE ${PORT}
