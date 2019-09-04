import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Description:
 * A template component that takes in input and has its own local state.
 *
 * @prop {Function} fn - Function passed in by App component.
 * @prop {Object} state - Object passed in by App component.
 */
class Component1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    console.log('props are ', props);
  }

  render() {
    return (
      <div>

        <h2>Component 1</h2>

        {(()=>{console.log(this.props.state)})()}

        <button
          type="button"
          className="test"
          style={{ backgroundColor: '#D6D6D5', fontWeight: 'bold', color: 'white' }}
          onClick={()=>{this.props.fn()}}>
          esc
        </button>

      </div>
    );
  }
}

Component1.propTypes = {
  fn: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default Component1;
