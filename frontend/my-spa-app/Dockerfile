FROM node:20-slim
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g http-server
EXPOSE 3000
CMD ["http-server", "build", "-p", "3000"]