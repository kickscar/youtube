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
```bash
$ npm i -D webpack webpack-cli webpack-dev-server @babel/core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader sass-loader react react-dom react-addons-update 
```

1. 웹팩 패키지 : webpack, webpack-cli
2. babel 패키지 : @babel/core,  @babel/preset-env, @babel/preset-react, babel-loader
3. 스타일시트 패키지 : style-loader, css-loader, sass-loader
4. react 라이브러리 패키지: react, react-dom, react-addons-update
5. 개발 도구: nodemon,  npm-run-all, webpack-dev-server(반드시 필요하지 않음)

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
  }], "@babel/preset-react"]
}
```

#### 5. webpack 설정(webpack.config.js)
```javascript
const path = require('path');

module.exports = {
    context: path.resolve('.'),
    entry: path.resolve('.', 'src', 'index.js'),
    output: {
        path: path.resolve('.', 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
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
  "start": "npm-run-all --parallel build:frontend run:server",
  "run:server": "nodemon --inspect -e js,mjs,json,htm,html,css --watch public bin/server.js",
  "build:frontend": "webpack --watch"
}
```

#### 7. 디렉토리 생성및 기본 소스 추가
```bash
$ mkdir src
$ mkdir public
$ mkdir bin
$ mjdir config
```

#### 8. 프로젝트 설정 테스팅
1. 서버 watch 모드로 실행
```bash
$ npm start
```

2. 소스 변경시 Live Reloading 확인 