const get_analytic_content = (provided_content, provided_type, provider_name, provider_data, providers) => {
    {
        let content = provided_content
        let type = provided_type
        if (content && content !== '') {
            if (!type || type === '') {
                type = 'html'
            }
            return [{ content, type }]
        }
    }
    if (providers[provider_name] === undefined) {
        return null
    }
    let result = []
    for (let provider_part of providers[provider_name]) {
        let { content, type } = provider_part
        for (let index = 1; index <= provider_data.length; index++) {
            content = content.replaceAll(`{${index}}`, provider_data[index - 1])
        }
        result.push({ content, type })
    }
    return result
}

export default get_analytic_content
