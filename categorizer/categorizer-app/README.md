## Categorizer: categorizer-app(frontend)

### 1 구성

1. React 기반 SPA
2. Application Bundle Landing을 위한 Web Server(Node)

### 2 Project Configuration

#### 1. 메니페스트 생성
```bash
$ npm init -y
```

#### 2. 패키지 설치(for developement)
1. 웹팩 패키지 : webpack, webpack-cli, webpack-dev-server

   ```bash
   $ npm i -D webpack webpack-cli webpack-dev-server
   ```

2. babel 패키지(js, ts 트랜스파일링 presets & plugins) : @babel/core,  @babel/preset-env, @babel/preset-react, @babel/plugin-proposal-class-properties, @babel/plugin-proposal-object-rest-spread, @babel/polyfill, babel-loader

   ```bash
   $ npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/polyfill
   ```

3. 스타일시트 babel loader 패키지 : style-loader, css-loader, sass-loader

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
  "presets": [["@babel/env",{
    "targets": {
      "ie": "11",
      "edge": "80",
      "firefox": "73",
      "chrome": "82",
      "opera": "69",
      "safari": "13"
    }
  }], "@babel/preset-react"],
  "plugins": [
        "@babel/plugin-proposal-class-properties"
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
        },{
            test: /\.css$/i,
            loader: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        },{
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

#### 6. package.json scripting
```json
"scripts": {
    "start": "webpack-dev-server --progress",
    "build": "webpack"
}
```

#### 7. 디렉토리 생성및 기본 소스 추가
```bash
$ mkdir src
$ mkdir public
$ mkdir bin
$ mkdir bin/config
```

#### 8. 프로젝트 설정 테스팅
1. 서버 watch 모드로 실행
```bash
$ npm start
```

2. 소스 변경시 Live Reloading 확인 