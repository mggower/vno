FROM hayd/alpine-deno:1.6.1

WORKDIR /app

COPY . .

ENV PORT=3030

CMD ["deno", "run", "-A", "--unstable", "server.ts"]

EXPOSE ${PORT}
