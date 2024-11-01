
import { memo } from 'react';

export default memo(function ButtonGroup({ title, data, buttonStyle, containerStyle, buttonWrapperStyle, onGenreSelected = () => null }) {
    
    return (
      <div className={containerStyle}>
          {title && <h1 className="text-white">{title}</h1>}
          <span className={"isolate inline-flex " + buttonWrapperStyle || " rounded-md shadow-sm p-4 min-w-[50%] justify-center gap-2"}>
            
            {data && data.map( d => 
                <button
                    onClick={() => onGenreSelected(d)}
                    key={d}
                    type="button"
                    className={"relative inline-flex " + buttonStyle || "items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"}
                >
                    {d}
                </button>
            )}
            

        </span>
      </div>
      
    )
  });
  