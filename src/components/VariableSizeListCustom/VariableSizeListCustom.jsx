import React, { useRef, useState, useEffect } from 'react';
import { VariableSizeList } from 'react-window';

const VariableSizeListCustom = ({ data, listStyles, gap=20 }) => {

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
        setRowHeight(index, rowRef.current.clientHeight + gap) // get height for every item
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
    const renderedItem = items && items.length > 0 ? items[index] : null
    return (
      <div style={style} 
      className={``}>
        <div ref={rowRef} 
        dangerouslySetInnerHTML={{__html: renderedItem && renderedItem.message}}
        className={`py-2 px-4 text-[#111928] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] rounded-3xl ${renderedItem.isReply ? "bg-white float-left" : "bg-[#97E2F7] float-right"}`}
        ></div>
      </div>
      
    );
  };


  return (
    <div ref={rootRef} style={{ height: '100%', width: '100%' }}>
      <VariableSizeList
        ref={listRef}
        height={divHeight}
        itemCount={itemCount}
        itemSize={getRowHeight}
        width="auto"
        className={listStyles}
      >
        {ListItem}
      </VariableSizeList>
    </div>
  )
}

export default VariableSizeListCustom;