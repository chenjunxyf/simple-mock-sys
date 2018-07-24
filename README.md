# simple-mock-sys

简单mock系统，适合作为webpack插件使用

## 使用方式

```bash
npm install simple-mock-sys -D
```

## 示例

```js
const path = require('path');

const SimpleMockSys = require('simple-mock-sys');
const mockConfig = require('./mock/config.js');

module.exports = {
  // ...
  plugins: [
    new SimpleMockSys(3000)
  ],

  devServer: {
    // proxy to the mock server
    proxy: {
        '/api/test': 'http://localhost:3000'
    }
  }
};
```

## 注意

`npm publish`

`registery: https://registry.npmjs.org/`