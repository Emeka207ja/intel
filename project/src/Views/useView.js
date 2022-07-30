import { useEffect,useState,useRef } from "react"

const useView = (options) => {
    const ref = useRef()
    const [visible, setVisible] = useState()
        useEffect(() => {
            const observer = new IntersectionObserver((entries) => {
                const entry = entries[0]
                setVisible(entry.isIntersecting)
            }, options)
            if (ref.current) {
                observer.observe(ref.current)
                console.log(ref.current)
            }
            if (!ref.current) {
                observer.unobserve(ref.current)
            }
            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current)
                }
            }
           
        }, [ref, options])
        return [ref,visible]
}
export const useOnscreen = (options) => {
    const refVal = useRef()
    const [view, setView] = useState()
        useEffect(() => {
            const observer = new IntersectionObserver(([entry]) => {
                setView(entry.isIntersecting)
            }, options)
            if (refVal.current) {
                observer.observe(refVal.current)
                console.log(refVal.current)
            }
            return () => {
                if (refVal.current) {
                    observer.unobserve(refVal.current)
                }
            }
        }, [refVal, options])
        return [refVal,view]
}
    export default useView