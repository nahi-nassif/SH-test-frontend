import React, { useRef, useState, useEffect } from 'react';
import { VariableSizeList } from 'react-window';

const VariableSizeListCustom = ({ data, listStyles }) => {

  const listRef = useRef({}) // to get reference of list container 
  const rowHeights = useRef({}) // to have heights of every row item
  const rootRef = useRef(null) // to have the height of main container 
  const [divHeight, setDivHeight] = useState(0) // default height of main container

  const items = data || [] // to have the fetched data
  const itemCount = items?.length // length of lists


  /* 
 
  getRowHeight function provides the height a of perticular row , 
  which all we have calculated in the LisItem component 
 
 */

  function getRowHeight(index) {
    console.log(rowHeights)
    return rowHeights.current[index] || 50;
  }

  useEffect(() => {
    if (rootRef.current) {
      setDivHeight(rootRef.current.clientHeight); // get the height of main container
    }
  }, [])

  const ListItem = ({ index, style }) => {
    const rowRef = useRef({}) // to get the reference of every row item 

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight) // get height for every item
      }
    }, [rowRef])


    /* setRowHeight function have set the height of every 
    row item in rowHeights object according to their index  */

    function setRowHeight(index, size) {
      listRef.current.resetAfterIndex(0);
      rowHeights.current = { ...rowHeights.current, [index]: size };
    }

    /* One most important thing is that you need to remember,
      give 'style' to your first div or HTML element in your item 
      component , which your are getting fromyour  ListItem children 
    
      and then give the rowRef to next element of item , don't have 'style' and 'rowRef'
      in the same HTML element
    
    */

    return (
      <div style={style}>
        <div ref={rowRef} >{ items && items.length > 0 && items[index].message }</div>
      </div>
      
    );
  };


  return (
    <div ref={rootRef} style={{ height: 'calc(100% - 100px)', width: '100%' }}>
      <VariableSizeList
        ref={listRef}
        height={divHeight}
        itemCount={itemCount}
        itemSize={getRowHeight}
        width="100%"
        className={listStyles}
      >
        {ListItem}
      </VariableSizeList>
    </div>
  )
}

export default VariableSizeListCustom;