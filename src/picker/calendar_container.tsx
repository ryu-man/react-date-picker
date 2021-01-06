import React, { useContext } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarStateContext } from "./picker";
import './animated_container.css'

const AnimateContainer = ({ children }: { children: React.ReactNode }) => {
    let translate: { x: number, y: number } = { x: 0, y: 0 }
    const [calendarState, setCalendarState] = useContext(CalendarStateContext)
    return (
        <AnimatePresence>
            {calendarState &&
                (
                    <div className="outer-animated-container" ref={positionate}>
                        <motion.div

                            initial={{ opacity: 0, scaleY: .1 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: .1 }}
                            transition={{ duration: .2, delay: .1, ease: "backInOut" }} >
                            {children}
                        </motion.div>
                    </div>
                )
            }
        </AnimatePresence>
    )


    function positionate(node: HTMLDivElement) {
        if (node) {
            translate = getXYTranslate(node)
            console.log(translate)
            node.style.transform = `translate(-50%, -50%) translate(${translate.x}px, ${translate.y}px)`
        }
    }
    function getXYTranslate(node: HTMLElement) {
        let dist = getDistanceToEdges(node)

        let x: number
        let y: number

        if (window.innerWidth < 480) {
            y = dist.bottom
        } else if (dist.top < 0) {
            y = Math.abs(dist.top)
        } else if (dist.bottom < 0) {
            y = dist.bottom
        } else {
            y = 0
        }
        if (dist.left < 0) {
            x = Math.abs(dist.left)
        } else if (dist.right < 0) {
            x = dist.right
        } else {
            x = 0
        }
        return { x, y }
    }
    function getDistanceToEdges(node: HTMLElement) {
        const rect = node?.getBoundingClientRect()
        const { x, y } = translate
        return {
            top: rect.top + (-1 * y),
            bottom: window.innerHeight - rect.bottom + y,
            left: rect.left + (-1 * x),
            right: document.body.clientWidth - rect.right + x
        }
    }
}
export default AnimateContainer

