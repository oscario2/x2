FROM denoland/deno:1.11.2

WORKDIR /x2

USER deno

# cache dependencies
COPY deps.ts .
RUN deno cache deps.ts

# these steps will be re-run upon each file change in your working directory:
ADD . .

# compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache tests/x2.test.ts

# rn
CMD ["run", "--allow-read", "tests/x2.test.ts"]