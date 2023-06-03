import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import '../fomantic-ui-css/semantic.min.css'
import { Form, Segment } from 'semantic-ui-react';

import Title from '../Title';
import SubTitle from '../SubTitle';
import Columns from '../Columns';
import Editor from '../Editor';
import Render from '../Render';
import CopyZone from '../CopyZone';
import DiagramType from '../DiagramType';
import RenderUrl from '../RenderUrl';
import ShrinkableButton from '../ShrinkableButton';
import WindowExampleCards from '../WindowExampleCards';
import WindowExampleDetail from '../WindowExampleDetail';
import WindowImportUrl from '../WindowImportUrl';

import './App.css'
import classNames from 'classnames';

const App = ({ onExamples, onImportUrl, onSetZenMode, zenMode, onKey, onResize, analytics }) => {
    if (!onExamples) {
        onExamples = () => { };
    }
    if (!onImportUrl) {
        onImportUrl = () => { };
    }

    const hasAnalytics = (analytics ? true : false)
    const analyticsJs = hasAnalytics ? (analytics.filter((item) => item.type === 'js')) : []
    const analyticsHtml = hasAnalytics ? (analytics.filter((item) => item.type !== 'js')) : []
    const hasAnalyticsJs = analyticsJs.length > 0
    const hasAnalyticsHtml = analyticsHtml.length > 0

    useEffect(() => {
        const handleResize = () => {
            const { offsetWidth: width, offsetHeight: height } = document.body;
            if (onResize) {
                onResize(width, height)
            }
        }

        const handleKeydown = (e) => {
            const { code, key, ctrlKey, shiftKey, altKey, metaKey } = e;
            if (onKey) {
                onKey({ code, key, ctrlKey, shiftKey, altKey, metaKey })
            }
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('keydown', handleKeydown);
        setTimeout(() => handleResize(), 0);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeydown);
        }
    });


    useEffect(() => {
        if (hasAnalyticsJs) {
            const scripts = analyticsJs.map((analyticsItem)=>{
                const script = document.createElement('script')

                script.async = 'true'
                const content = analyticsItem.content

                if (content.startsWith('http://') || content.startsWith('https://') || content.startsWith('//')) {
                    script.setAttribute('src',content)
                } else {
                    script.textContent = content
                }

                document.head.appendChild(script)
                return script
            })

            return () => {
                for(let script of scripts) {
                    document.head.removeChild(script)
                }
            }
        }
        return () => { }
    })

    return <div className={classNames({ zenMode, App: true })}>
        <div className='NonZen'>
            <Title />

            <Segment basic>
                <Form className='diagramParams'>
                    <Form.Field>
                        <SubTitle />
                    </Form.Field>
                    <Form.Field>
                        <div className='controlZone'>
                            <div className='diagramTypeZone'>
                                <DiagramType />
                            </div>
                            <div className='buttonsZone'>
                                <ShrinkableButton floated='right' onClick={() => onSetZenMode()} icon='external alternate' text='Zen Mode' textAlt='Zen' />
                                <ShrinkableButton floated='right' onClick={() => onImportUrl()} icon='write' text='Import diagram URL' textAlt='URL' />
                                <ShrinkableButton floated='right' onClick={() => onExamples()} icon='list alternate outline' text='Examples' textAlt='Ex.' />
                            </div>
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <RenderUrl />
                    </Form.Field>
                </Form>
            </Segment>
        </div>
        <div className='MainPanel'>
            <Columns>
                <Editor />
                <Render />
            </Columns>
            {
                hasAnalyticsHtml ? analyticsHtml.map((item) => <div className='analyticsPanel' dangerouslySetInnerHTML={{ __html: item.content }} />) : null
            }
        </div>
        <div className='NonZen'>
            <CopyZone />
            <WindowExampleCards />
            <WindowExampleDetail />
            <WindowImportUrl />
        </div>
    </div>
}

App.propTypes = {
    onExamples: PropTypes.func.isRequired,
    onImportUrl: PropTypes.func.isRequired,
    onSetZenMode: PropTypes.func.isRequired,
    onKey: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
};

export default App;
