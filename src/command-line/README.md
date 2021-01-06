# Create a new project with vno CLI

- Create a directory for your project
- CD into the aforementioned directory
- Copy the following code into your terminal

```
deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno/dist/mod.ts
```

- Copy the export path your terminal returns and paste it into your terminal
  ![install gif](https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif)

- Use vno's CLI to create a new project:

```
vno create [project name]
```

![vno create](https://i.ibb.co/Fw5Sp7n/vno-create.gif)

- _OR_ If you'd rather not install:

```
deno run --allow-read --allow-write --allow-run --allow-net --unstable https://deno.land/x/vno/dist/mod.ts create [project name]
```

- **note: If you would like to avoid writing out all the permissions, you can also use the '-A' tag**
- Like so:

```
deno run --A --unstable https://deno.land/x/vno/dist/mod.ts create [project name]
```

# Using the build method

- To invoke the build method and dynamically create bundled .js and .css files for your application type the following into the terminal:

```
vno build
```

_OR_

```
deno run --allow-read --allow-write --allow-run --allow-net --unstable https://deno.land/x/vno/dist/mod.ts build
```

![vno build](https://i.ibb.co/jgRFXvc/vno-build.gif)

**It is important to know that as of now, scoped styling is not supported**

# The vno dev server

- Running the dev server dynamically creates a new build folder and runs the application on a cloud hosted server
- Invoke the dev server like so:

```
vno run dev
```

_OR_

```
deno run --allow-read --allow-write --allow-run --allow-net --unstable https://deno.land/x/vno/dist/mod.ts run dev
```

![vno run dev](https://i.ibb.co/RckD0Tm/vno-run-dev.gif)
