import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Component1 from './Component1.jsx';
import Component2 from './Component2.jsx';

/**
 * Description:
 * App component renders all views for the application.
 * Its State holds all data and disseminates it to all
 * React sub-components.
 *
 * @prop - none.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Fires before render() (i.e., before this component has been inserted into the DOM)
  componentWillMount() {
  }

  // Fires after render() (i.e., after this component has been inserted into the DOM)
  componentDidMount() {
  }

  // Test Function
  fn() {
    console.log('fn fired');
    this.setState({
      test: 'setting state',
    });
  }

  // Notes on Render Function:
  /* Make sure return has its opening parenthesis on the same line. */
  render() {
    return (
      <div>
        <h1>HELLO</h1>
        <Component1
          state={this.state}
          fn={this.fn.bind(this)}
        />
        <Component2
          list ={['1', '2', '3']}
          doThis= {() => 10} // using arrow functions allows the delegation of "this" to the enclosing context which is this component.
          hashTable= {{ obj: 1 }}
        />
      </div>
    );
  }
}

App.propTypes = {
};

export default App;

