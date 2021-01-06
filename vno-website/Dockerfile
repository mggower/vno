FROM hayd/alpine-deno

WORKDIR /app

ENV PORT=8080

COPY . .

CMD ["deno", "run", "-A", "--unstable", "server.ts"]

EXPOSE ${PORT}


