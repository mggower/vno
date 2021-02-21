# API

### initializing your application

```
import Factory from 'vno';

const vno = new Factory();
await vno.build();
```

```
import Factory from 'vno';

const vno = new Factory({
  root: "App",
  entry: "./"
  vue: 3,
  options: {
    port: 3000
  }
})

await vno.build();
```