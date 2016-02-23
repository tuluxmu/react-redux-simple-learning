#开发环境搭建

##Demo

<a href="http://tuluxmu.github.io/react-redux-simple-learning/">Click here</a>

##webpack

`sudo npm install -g webpack`

##依赖包

创建一个文件夹，随便叫什么名字，比如redux-test。


`mkdir redux-test && cd redux-test`
然后用npm安装以下依赖包：

babel-loader
react
react-dom
react-redux
redux

这个项目中需要把ES6、JSX转换为浏览器可运行的ES5语法，所以我们需要使用webpack及其babel-loader来进行转换、打包。这里我们默认index.jsx是入口文件。

```
//webpack.config.js
module.exports = {
    entry: 'index.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015','react']
            }
        }]
    }
};
```

##HTML

```
<!DOCTYPE html>
<html>

<head>
  <title>React-Redux Hello World</title>
</head>

<body>
  <div id="root"></div>
</body>

<script type="text/javascript" src="bundle.js"></script>

</html>
```

##0-引入依赖包
我们需要react的本体、react-dom的render方法、redux的createStore和bindActionCreators方法，以及react-redux的Provider和connect方法

```
import React from 'react';
import { render } from 'react-dom';
import { createStore,bindActionCreators } from 'redux';
import { Provider ,connect } from 'react-redux';
```

##1-Action 行为/动作
规划我们所需要定义的事件,把它定义为我们的行为

##2-Reducer
对于不同的action，对应的状态转换也不一样：

##3-Store 存储
Store是由Redux直接生成的：
`let store = createStore(myApp);`
##4-构建组件
##5-连接React组件和Redux
Redux里的函数`bindActionCreators`和`connect`
##6-渲染App
`//Provider是react-redux直接提供的`
##7-编译/打包
`webpack`
就可以把index.jsx编译打包成bundle.js了

##总结
Redux作为Flux架构的一个变种，本来就是“适合大型应用”的，它解决的是当应用复杂度上升时，数据流混乱的问题，而并非直接提升你的代码效率
##源码 index.jsx

```
import React from 'react';
import {render} from 'react-dom';
import { createStore,bindActionCreators } from 'redux';
import { Provider ,connect} from 'react-redux';


//action
function clickPlus() {
  return {
    type: 'ClickPlus'
  }
}

function clickMinus() {
  return {
    type: 'clickMinus'
  }
}

//reducer
const initialState = {
  index: 0
}
function myApp(state = initialState, action) {
    console.log('myApp', action);
  switch (action.type) {
    case 'ClickPlus':
      return {
        index: ++state.index
      }
    case 'clickMinus':
      return {
        index: --state.index
      }
    default:
      return {
        index:state.index
      }
  }
}

//store
let store = createStore(myApp);
class ClickPlus extends React.Component {
  constructor(props) {
    super(props);
   
    this.clickPlus = this.clickPlus.bind(this);

  }
  clickPlus() {
    this.props.actions.clickPlus();
  }
  render() {
    return (
      <span onClick={this.clickPlus}>+</span>
    );
  }
}
class ClickMinus extends React.Component {
  constructor(props) {
    super(props);
    this.clickMinus = this.clickMinus.bind(this);
  }

  clickMinus() {
    this.props.actions.clickMinus();
  }

  render() {
    return (
      <span onClick={this.clickMinus}>-</span>
    );
  }
}
class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { actions, index } = this.props;
    return (
    <div>
      <span>{index}</span>
      <ClickPlus actions = {actions} />
      <ClickMinus actions = {actions} />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { index: state.index }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clickPlus: clickPlus,
      clickMinus: clickMinus
    },dispatch)
  }
}
Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)
```
