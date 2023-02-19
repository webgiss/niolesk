import React, { useRef } from 'react';
import { useEffect } from 'react';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom'
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader'

import './Render.css'

const miniatureProps = {
    miniaturePosition: "left",
    miniatureBackground: "#fff",
    miniatureWidth: 100,
    miniatureHeight: 80
}

const toolbarProps = {
    toolbarPosition: "right"
}

const changeTextHeightIfDifferent = (textHeight, changeTextHeight, textRef) => {
    const newTextHeight = textRef.current.offsetHeight
    if (textHeight !== newTextHeight) {
        changeTextHeight(newTextHeight)
    }
}

const Render = ({ diagramUrl, diagramEditUrl, diagramError, onDiagramError, zenMode, height, textHeight, diagramHeight, changeTextHeight, use_pan_zool, onChangeTool, onChangeValue, tool, value }) => {
    const textRef = useRef(null);
    const renderRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', () => {
            changeTextHeightIfDifferent(textHeight, changeTextHeight, textRef)
        })
        changeTextHeightIfDifferent(textHeight, changeTextHeight, textRef)
    })

    const width = renderRef?.current?.offsetWidth || 550;

    return <div ref={renderRef} className='Render' style={{ height: (zenMode && height) ? `${height}px` : `${height}px` }}>
        <div className='RenderDiagramZone'>
            {
                diagramError ?
                    <iframe className='RenderImageError' width={`${width}px`} height={`${diagramHeight}px`} title='Error' src={diagramUrl}></iframe> :
                    (
                        use_pan_zool
                            ?
                            <ReactSvgPanZoomLoader

                                src={diagramUrl}

                                render={(content) => {
                                    window.content = content
                                    return <ReactSVGPanZoom
                                        width={width}
                                        height={diagramHeight}
                                        tool={tool}
                                        onChangeTool={(tool) => onChangeTool(tool)}
                                        value={value}
                                        onChangeValue={(value) => onChangeValue(value)}

                                        toolbarProps={toolbarProps}
                                        miniatureProps={miniatureProps}
                                    >
                                        <svg width={width} height={diagramHeight}>
                                            {content}
                                        </svg>
                                    </ReactSVGPanZoom>
                                }
                                }
                            />
                            :
                            <img alt='Diagram' className='RenderImage' src={diagramUrl} height={diagramHeight} width={width} onError={(e) => { onDiagramError(diagramUrl) }} />
                    )
            }
        </div>
        <p ref={textRef} className='RenderEditMessage'><a href={diagramEditUrl}>Edit this diagram.</a></p>
    </div>
}

export default Render;