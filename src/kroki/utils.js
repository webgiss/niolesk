export const createKrokiUrl = (renderUrl, diagramType, filetype, encodedText) => [renderUrl.replace(/\/*$/, ''), diagramType, filetype, encodedText].join('/')
