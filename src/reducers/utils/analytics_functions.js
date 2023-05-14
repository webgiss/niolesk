const get_analytic_content = (provided_content, provided_type, provider_name, provider_data, providers) => {
    {
        let content = provided_content
        let type = provided_type
        if (content && content !== '') {
            if (!type || type === '') {
                type = 'html'
            }
            return { content, type }
        }
    }
    if (providers[provider_name] === undefined) {
        return null
    }
    let { content: pattern, type } = providers[provider_name]
    for (let index = 1; index <= provider_data.length; index++) {
        pattern = pattern.replaceAll(`{${index}}`, provider_data[index - 1])
    }
    return { content: pattern, type }
}

export default get_analytic_content
