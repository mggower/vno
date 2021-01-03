      const runSubProcess = Deno.run({
        cmd: [
          "deno",
          "run",
          "--unstable",
          "--allow-read",
          "--allow-write",
          "--allow-run",
          `${Deno.cwd()}/${config.base}`,
        ],
      });
      const { code } = await runSubProcess.status();
      Deno.exit(code);