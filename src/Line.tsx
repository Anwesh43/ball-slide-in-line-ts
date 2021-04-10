import React from 'react'
import {
    useStyle
} from './hooks'

interface LineProps {
    w : number, 
    h : number, 
    scale : number
}

const Line : React.FC<LineProps> = (props : LineProps) => {
    const {w, h, scale} = props
    const {lineStyle} = useStyle(w, h, scale) 
    return <div style = {lineStyle()}>      
    </div>
}

export default Line 