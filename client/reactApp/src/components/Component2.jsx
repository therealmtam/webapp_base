import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Description:
 * This is a template of a stateless React component
 *
 * @prop {Array} list - Array passed in by App component.
 * @prop {Function} doThis - Function passed in by App component.
 * @prop {Object} hashTable - Object passed in by App component.
 */
const Component2 = ({ list, doThis, hashTable }) => (
  <div>

    <h2>Component 2</h2>

    {(() => {
      console.log(list, doThis, hashTable);
    })()}

  </div>
);

Component2.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  doThis: PropTypes.func.isRequired,
  hashTable: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Component2;

