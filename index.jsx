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



