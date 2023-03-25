import React from 'react';

const Bookmark = ({status, ...rest})=> {
    const getClasses = () => {
        let classes = 'bi bi-bookmark';
        return (classes+=status ? '-fill' : '');
    };
return(
    <button {...rest}>
        <i className={getClasses()} ></i>
    </button>
) 
}
export default Bookmark;