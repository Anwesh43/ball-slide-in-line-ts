import React from 'react'
import {useStyle} from './hooks';

interface CircleProps {
    w : number, 
    h : number,
    scale : number 
    onClick: Function 
}

const Circle : React.FC<CircleProps> = (props : CircleProps) => {
    const {onClick, w, h, scale} = props 
    const {circleStyle} = useStyle(w, h, scale)
    return (
        <div style = {circleStyle()} onClick = {() => onClick()}>
        </div>
    )
}

export default Circle 