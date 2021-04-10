import React from 'react'
import {
    useAnimatedScale, 
    useDimension
} from './hooks'
import Line from './Line'
import Circle from './Circle'

const BallSlideInLine : React.FC<any> = (props : any) => {
    const {scale, start} = useAnimatedScale()
    const {w, h} = useDimension()
    return (
        <div>
            <Circle w = {w} h = {h} scale = {scale} onClick = {start}/>
            <Line w = {w} h = {h} scale = {scale}/>
        </div>
    )
}

export default BallSlideInLine