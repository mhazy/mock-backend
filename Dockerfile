FROM mhart/alpine-node:4

ENV project_user app
ENV project_dir /home/${project_user}/app

USER root
RUN adduser -D ${project_user}

RUN mkdir -p ${project_dir} \
  && chown -R ${project_user}:${project_user} ${project_dir}

USER ${project_user}

# npm install
COPY package.json /tmp/package.json
RUN cd /tmp \
 && npm config set registry https://registry.npmjs.org/ \
 && npm install --production \
 && cp -R /tmp/node_modules ${project_dir}

WORKDIR ${project_dir}
COPY . ${project_dir}

ENV PORT 3000
CMD ["npm", "start"]
EXPOSE 3000
