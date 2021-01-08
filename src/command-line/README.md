### vno installation

- run the following command in your terminal to install vno on your machine.

```
deno install --allow-net --unstable https://deno.land/x/vno/install/vno.ts
```

- Deno requires the `--allow-net` permissions to run an installation
- This feature, and many of the others used in vno are still considered "unstable" for Deno. Run the command with `--unstable` to allow these resources to execute.
- The force flag `-f` is only necessary when you want to overwrite an existing copy of the module
- name the module in your path with the name flag `-n` or `--name` , we suggest using 'vno'
- If you have not already added Deno bin into your path, you will need to do so.

  - Copy the export path your terminal returns and paste it into your terminal

  ![install gif](https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif)

### a quick word about permissions

- Deno is secure by default, this means that explicit permissions are required for certain tasks.
- You can avoid responding to the permissions requests by flagging the installation script.
- Most of our module require read and write permissions `--allow-read` & `--allow-write`
- run permissions are only required for commands that execute a sub process, for example `vno run server` will run a users own server file after executing a build. Deno needs these permissions to do so.
- if you decide not to flag permissions at installation, users will be prompted in the terminal after executing a command.
- **note: If you would like to avoid writing out the permissions altogether, you can also use the '-A' tag**

### create a new project

- create a directory for your project
- CD into the aforementioned directory

```
vno create [project name]
```

![](https://i.ibb.co/Fw5Sp7n/vno-create.gif)

- _OR_ If you'd rather not install:

```
deno run --allow-read --allow-write --allow-net --unstable https://deno.land/x/vno/install/vno.ts create [project name]
```

### run a build on a project

- To invoke the build method and dynamically create bundled js and css files for your application type the following into the terminal:

```
vno build
```

_OR_

```
deno run --allow-read --allow-write --allow-net --unstable https://deno.land/x/vno/install/vno.ts build
```

![vno build](https://i.ibb.co/jgRFXvc/vno-build.gif)

**It is important to know that as of now, scoped styling is not supported**

### run a simple dev server

- Running the dev server dynamically runs a new build and runs the application on a module hosted server
- Invoke the dev server like so:

```
vno run dev
```

_OR_

```
deno run --allow-read --allow-write --allow-net --unstable https://deno.land/x/vno/install/vno.ts run dev
```

![vno run dev](https://i.ibb.co/RckD0Tm/vno-run-dev.gif)

### vno run server

- add a server property in your vno.config.json file

```
{
  "root": "App",
  "entry": "./path/to/rootcomponent",
  "options": {
    "title": "an example application"
    "port": 4040
  },
  "server": "./path/to/server.ts"
}
```

- And execute this command in the terminal
- vno run server creates a subprocess, which will request run permissions

```
vno run server
```

![](https://i.ibb.co/xFZPM1L/vno-run-server.gif)
