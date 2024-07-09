FROM node:20-slim

ARG USER_ID=1000
ARG GROUP_ID=1000

# Atualiza os pacotes e instala dependências necessárias
RUN apt update -y && apt upgrade -y
RUN apt install -y python3 python3-pip

#RUN apk update && apk add bash
#RUN apk add --no-cache bash
RUN apt update -y && apt upgrade -y
RUN userdel -f node
RUN if getent group node ; then groupdel node; fi
RUN groupadd -g ${GROUP_ID} node
RUN useradd -l -u ${USER_ID} -g node node
RUN install -d -m 0775 -o node -g node /home/node

#install global npm packages
RUN npm install -g @angular/cli

USER node

EXPOSE 4200

#@16 @angular-devkit/build-angular @turf/turf




# Usar uma imagem oficial do Node.js como base
#FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
#WORKDIR /app

# Instalar o Angular CLI globalmente dentro da imagem
#RUN npm install -g @angular/cli

# Copiar o 'package.json' e o 'package-lock.json' (se disponível)
#COPY package*.json ./

# Instalar todas as dependências do projeto
#RUN npm install

# Copiar o resto dos arquivos do projeto
#COPY . .

# Expõe a porta 4200, que é a porta padrão do servidor de desenvolvimento Angular
#EXPOSE 4200

# Comando para rodar o servidor de desenvolvimento
#CMD ["ng", "serve", "--host", "0.0.0.0"]

