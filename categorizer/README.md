## Categorizer: Admin. Tool for Categorizing Youtube Videos

### 1. api-server(backend)

#### 1.1 Restful API Server Based on Node

### 2. categorizer-app(frontend)

#### 2.1 구성

1. React 기반 SPA
2. Application Bundle Landing을 위한 Web Server(Node)

#### 2.2 Project Configuration

1. 메니페스트 생성

      ```bash
   $ npm init -y
   ```

2. 패키지 설치

      ```bash
   $ npm i -D webpack webpack-cli webpack-dev-server @babel/core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader sass-loader react react-dom react-addons-update
   ```

   - 웹팩 패키지 : webpack, webpack-cli, webpack-dev-server

   - babel 패키지 : @babel/core,  @babel/preset-env, @babel/preset-react, babel-loader

   - 스타일시트 패키지 : style-loader, css-loader, sass-loader

   - react 라이브러리 패키지: react, react-dom, react-addons-update

3. babel 설정(babel.config.json)

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

4. webpack 설정(webpack.config.js)

      ```javascript
      const path = require('path');
      module.exports = {
          entry: path.resolve('src/index.js'),
          output: {
              path: path.resolve('public'),
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
              contentBase: path.resolve('public'),
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

5. package.json scripting

      ```json
      "scripts": {
          "build": "npx webpack",
          "start": "npx webpack-dev-server --progress"
        }
      ```

6. 디렉토리 생성

      ```bash
      $ mkdir src
      $ mkdir public
      ```

7. ㅇㅈㅂㅈ