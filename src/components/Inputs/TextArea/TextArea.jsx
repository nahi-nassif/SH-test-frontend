import "./style.css"
import { forwardRef, useState } from 'react';

const TextArea = forwardRef(({ name, maxCharacters, rows, placeholder, placeholderIcon, onChange, onFocus, textAreaContainerStyle, textAreaStyle, counterStyle}, ref) => {

    const maxChars = maxCharacters || 3000; // Maximum character limit
    const [inputLength, setInputLength] = useState(0)

    return (
        <div className={"text-area relative " + textAreaContainerStyle}>
            <textarea
                ref={ref}
                name = {name || "text"}
                onChange={(e)=>{
                    setInputLength(ref.current?.value?.length || 0)
                    onChange(e);
                }}
                onFocus={onFocus}
                rows={ rows || 2}
                maxLength={maxChars} // Set max characters
                placeholder={placeholder || "Type your message..."}
                className={"p-4 placeholder:indent-4 " + textAreaStyle}
            />
            {
                placeholderIcon && <span className="icon absolute top-5 left-2 w-4">
                    {placeholderIcon}
                </span>
            }
            <div className={"absolute bottom-1 right-0 " + counterStyle}>
                {inputLength || 0} / {maxChars}
            </div>
        </div>
    )

    
})

export default TextArea;