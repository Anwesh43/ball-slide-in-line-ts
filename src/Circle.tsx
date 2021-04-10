import React from 'react'

interface CircleProps {
    w : number, 
    h : number,
    scale : number 
    onClick: Function 
}

const Circle : React.FC<CircleProps> = (props : CircleProps) => {
    const {onClick} = props 
    return (
        <div style = {{}} onClick = {() => onClick()}>
        </div>
    )
}

export default Circle 