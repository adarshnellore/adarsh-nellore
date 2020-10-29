import React from 'react';

// Display No results found in conjunction with Search component

const NotFound = () => (
  <ul className="not-found">
    <li>
      <h3>No Results Found</h3>
      <p>You search did not return any results. Please try again.</p>
    </li>
  </ul>
);

export default NotFound;