import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = () => {
    return <div>Hello, eeeeee!</div>;
};

MyComponent.propTypes = {
    name: PropTypes.string.isRequired
};

export default MyComponent;