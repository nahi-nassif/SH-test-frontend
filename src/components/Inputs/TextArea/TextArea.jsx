import "./style.css"


const TextArea = ({ name, maxCharacters, rows, placeholder, placeholderIcon, onChange, onFocus, value,textAreaContainerStyle, textAreaStyle, counterStyle}) => {

    const maxChars = maxCharacters || 3000; // Maximum character limit

    return (
        <div className={"text-area relative " + textAreaContainerStyle}>
            <textarea
                name = {name || "text"}
                value={value}
                onChange={onChange}
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
                {value?.length || 0} / {maxChars}
            </div>
        </div>
    )

    
}

export default TextArea;