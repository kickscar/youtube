## Categorizer: categorizer-app(frontend)

### 1. 구성

1. React 기반 SPA
2. Application Bundle Landing을 위한 Web Server(Node)

### 2. Project Configuration(start from git source)

```bash
npm install
```

### 3. Project Configuration(start from scratch)

#### 1. 메니페스트 생성
```bash
$ npm init -y
```

#### 2. 패키지 설치(for development)
1. 웹팩 패키지 : webpack, webpack-cli, webpack-dev-server

   ```bash
   $ npm i -D webpack webpack-cli webpack-dev-server
   ```

2. babel 패키지(core, loader, presets & plugins for transfiling) : 

   @babel/core

   @babel/preset-env, @babel/preset-react, @babel/preset-typescript

   @babel/plugin-proposal-class-properties, @babel/plugin-proposal-object-rest-spread

   @babel/polyfill

   babel-loader

   ```bash
   $ npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/polyfill
   ```

3. css babel loader 패키지 : style-loader, css-loader, sass-loader

   ```bash
   $ npm i -D style-loader css-loader sass-loader
   ```

4. 기타 파일 babel loader 패키지 : file-loader, url-loader

   ```bash
   $ npm i -D file-loader, url-loader
   ```

5. react 라이브러리 기본 패키지: react, react-dom, react-addons-update

   ```bash
   $ npm i -D react react-dom react-addons-update 
   ```

6. node 개발 도구: nodemon,  npm-run-all

7. 기타 application dependency

   jwt-decode, react-cookie 

   react-router-auth, react-router-dom

   redux, react-redux, redux-saga

   react-loadable, reactstrap, availity-reactstrap-validation

   bootstrap, node-sass, react-perfect-scrollbar, metismenujs, 

   ```bash
   $ npm i -D nodemon npm-run-all
   ```

#### 3. 패키지 설치(for production)
```bash
$ npm i express 
```
1. 웹서버 프레임워크 : express
   
#### 4. babel 설정(babel.config.json)
```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "ie": "11",
          "edge": "80",
          "firefox": "73",
          "chrome": "82",
          "opera": "69",
          "safari": "13"
        }
      }
    ],
    [
      "@babel/preset-typescript",
      {
        "compilerOptions": {
          "target": "es6",
          "moduleResolution": "node",
          "allowJs": true,
          "checkJs": true,
          "noEmit": true,
          "strict": true,
          "isolatedModules": true,
          "esModuleInterop": true,
          "noImplicitAny": false,
          "sourceMap": false
        },
        "include": [
          "src"
        ],
        "exclude": [
          "node_modules"
        ]
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

#### 5. webpack 설정(webpack.config.js)
```javascript
const path = require('path');

module.exports = {
    context: path.resolve('.'),
    entry: ["@babel/polyfill", path.resolve('.', 'src', 'index.js')],
    output: {
        path: path.resolve('.', 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [{
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/i,
            loader: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10000,
            },
        }]
    },
    devServer: {
        contentBase: path.resolve('.', 'public'),
        host: '0.0.0.0',
        port: 9999,
        inline: true,
        liveReload: true,
        hot: false,
        compress: true,
        historyApiFallback: true
    }
}
```

#### 6. Scripting in package.json 
```json
"scripts": {
    "start": "webpack-dev-server --progress",
    "build": "webpack"
}
```

#### 7. 프로젝트 디렉토리 생성
```bash
$ mkdir src
$ mkdir public
$ mkdir bin
$ mkdir bin/config
```

- src : frontend react app source
- public : frontend app budle, landing html
- bin : web server(node)
- bin/donfig : web server configuration 

#### 8. 프로젝트 설정 테스팅

1. 개발 서버 실행

   ```bash
   $ npm start
   ```

2. 번들링(빌드)

   ```bash
   $ npm run build
   ```

   