import React, { useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import './Render.css'

const Render = ({ diagramUrl, diagramEditUrl, diagramError, onDiagramError, height, width, onEditSizeChanged }) => {
    const editRef = useRef(null)
    useEffect(() => {
        if (!editRef.current) {
            return
        }
        const resizeObserver = new ResizeObserver(() => {
            console.log({ onEditSizeChanged, clientWidth: editRef.current.clientWidth })
            if (onEditSizeChanged) {
                onEditSizeChanged(editRef.current.clientWidth, editRef.current.clientHeight)
            }
        })
        resizeObserver.observe(editRef.current)
        return () => resizeObserver.disconnect()
    }, [])
    return <div className='Render'>
        <div className='RenderDiagramZone' style={{ width: `${width}px` }}>
            {
                diagramError ?
                    <iframe className='RenderImageError' width={width} height={height} title='Error' src={diagramUrl}></iframe> :
                    <TransformWrapper width={width} height='100%' maxScale={100}>
                        <TransformComponent>
                            <div style={{ width: width, height: height }}>
                                <img alt='Diagram' className='RenderImage' src={diagramUrl} onError={(e) => { onDiagramError(diagramUrl) }} style={{ maxWidth: width, maxHeight: height,  }} />
                            </div>
                        </TransformComponent>
                    </TransformWrapper>
            }
        </div>
        <p className='RenderEditMessage' ref={editRef}><a href={diagramEditUrl}>Edit this diagram.</a></p>
    </div>
}

export default Render;