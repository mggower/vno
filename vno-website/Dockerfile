FROM hayd/alpine-deno:1.6.1

WORKDIR /app

COPY . .

ENV PORT=8000

CMD ["deno", "run", "-A", "--unstable", "server.ts"]

EXPOSE ${PORT}
