import React from 'react';

import './icon.scss'

const Search = ({ fillColor, className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 18.9 18.9"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.3,12.9c2.4-3.1,2.2-7.7-0.7-10.6c-3.1-3.1-8.2-3.1-11.3,0c-3.1,3.1-3.1,8.2,0,11.3
	        c2.9,2.9,7.4,3.1,10.6,0.7c0,0,0,0,0,0l4.2,4.2c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4L14.3,12.9C14.3,12.9,14.3,12.9,14.3,12.9z
	        M12.2,3.8c2.3,2.3,2.3,6.1,0,8.5c-2.3,2.3-6.1,2.3-8.5,0c-2.3-2.3-2.3-6.1,0-8.5C6.1,1.4,9.9,1.4,12.2,3.8z"
        className={className}
        fill={fillColor} />
    </svg>
  )
}

export default Search

