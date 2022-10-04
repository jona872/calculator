import React from 'react'

export default function Circle(props) {
        
    const cn = (props.holded == true) ? "theme--active" : "";
    
    return (
        <div className={cn}> </div>
    )
}
