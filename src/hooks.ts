import {
    useState, 
    useEffect,
    CSSProperties
} from 'react'

const scGap : number = 0.01
const delay : number = 3

const maxScale : Function = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale : Function = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify : Function = (scale : number) : number =>  Math.sin(scale * Math.PI)

class Loop {
    t : number = 0
    running : boolean = false 
    constructor(private cb : Function, private delay : number) {

    }
    start() {
        if (!this.running) {
            this.running = true 
            this.loop()
        }
    }
    loop() {
        requestAnimationFrame(() => {
            this.t++
            if (this.t % this.delay == 0) {
                this.cb()
            }
            if (this.running) {
                this.loop()
            }
        })
    }
    stop() {
        if (this.running) {
            this.running = false 
        }
    }
}

const setCustomInterval = (cb : Function, delay : number) : Loop  => {
    const loop : Loop = new Loop(cb, delay)
    loop.start()
    return loop 
}

export const useAnimatedScale = () => {
    const [scale, setScale] : [number, Function] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const loop : Loop = setCustomInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            loop.stop()
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] : [number, Function] = useState(window.innerWidth)
    const [h, setH] : [number, Function] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)           
        } 
        return () => {

        }
    })
    return {
        w, 
        h 
    }
}

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 6 
    const lSize : number = Math.min(w, h) / 90
    const position = 'absolute'
    const sf = sinify(scale)
    const sf1 = divideScale(sf, 0, 2)
    const sf2 = divideScale(sf, 1, 2)

    return {
        circleStyle() : CSSProperties {
            const width : string = `${size}px`
            const height : string = `${size}px`
            const left : string = `${(w - size) * sf2}px`
            const top : string = `${h / 2 - size}px`
            const borderRadius : string = '50%'
            const background : string = 'green'
            return {
                position, 
                width, 
                height, 
                left, 
                top, 
                background,
                borderRadius
            }
        },

        lineStyle() : CSSProperties {
            const width : string = `${w * sf1}px`
            const height : string = `${lSize / 2}px`
            const background : string = "green"
            const left = '0px'
            const top = `${h / 2}px`
            return {
                position, 
                width,
                height, 
                top, 
                left,
                background
            }
        }
    }
}