import get_analytic_content from './analytics_functions'

const default_content = `
    analytics_call('https://example.com/analytics', '3;7,15,1,292')
    `

const example_provider_name = 'example'
const example_provider_data = ['https://example.com/analytics', '42']

const other_provider_name = 'other'
const other_provider_data = ['https://example.com/analytics/142.png']

const complex_provider_name = 'complex'
const complex_provider_data = ['https://example.com/analytics', '43', 'erk']

const nonexisting_provider_name = 'nonexisting'
const nonexisting_provider_data = ['https://example.com/analytics', '43', 'erk']

const nodata_provider_name = 'nodata'
const nodata_provider_data = []

const multiple_js_provider_name = 'multiple_js'
const multiple_js_provider_data = ['E-B6533HAL42']

const default_providers = {
    'example': [
        {
            type: 'js',
            content: `
                const analytics_url='{1}';
                const analytics_id='{2}';
                analytics_call(analytics_url, analytics_id)
            `,
        },
    ],
    'other': [
        {
            type: 'html',
            content: `<img src='{1}' />`,
        },
    ],
    'complex': [
        {
            type: 'js',
            content: `
                const analytics_url='{1}';
                const analytics_id='{2}';
                analytics_call('{1}', '{2}', '{3}')
            `,
        },
    ],
    'nodata': [
        {
            type: 'html',
            content: `<img src='https://exemple.com/analytics/no_data.png' />`,
        },
    ],
    'multiple_js': [
        {
            type: 'js',
            content: `https://example.com/tag/js?id={1}`,
        },
        {
            type: 'js',
            content: `
                window.dataExample = window.dataExample || []
                const exampleTag = ()=>dataExample.push(arguments)
                exampleTag('js',new Date())
                exampleTag('config', '{1}')
            `,
        },
    ]
}

const example_expected_content = [
    {
        content: `
                const analytics_url='https://example.com/analytics';
                const analytics_id='42';
                analytics_call(analytics_url, analytics_id)
            `,
        type: 'js',
    },
]

const other_expected_content = [
    {
        content: `<img src='https://example.com/analytics/142.png' />`,
        type: 'html',
    },
]

const complex_expected_content = [
    {
        content: `
                const analytics_url='https://example.com/analytics';
                const analytics_id='43';
                analytics_call('https://example.com/analytics', '43', 'erk')
            `,
        type: 'js',
    },
]

const nodata_expected_content = [
    {
        content: default_providers['nodata'][0]['content'],
        type: 'html',
    },
]

const multiple_js_expected_content = [
    {
        content: 'https://example.com/tag/js?id=E-B6533HAL42',
        type: 'js',
    },
    {
        content: `
                window.dataExample = window.dataExample || []
                const exampleTag = ()=>dataExample.push(arguments)
                exampleTag('js',new Date())
                exampleTag('config', 'E-B6533HAL42')
            `,
        type: 'js',
    },
]

describe('get_analytic_content', () => {
    it('should return the content if provided a non null non empty string', () => {
        const content = default_content
        const type = 'html'
        const provider_name = example_provider_name
        const provider_data = example_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toStrictEqual([{ content: default_content, type: 'html' }]);
    })

    it('should return null if provided an empty content, and a provider name that doesnt exists in providers', () => {
        const content = ''
        const type = ''
        const provider_name = nonexisting_provider_name
        const provider_data = nonexisting_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toBeNull();
    })

    it('should return null if provided an empty content, and a provider name that doesnt exists in providers even if type is provided not empty', () => {
        const content = ''
        const type = 'js'
        const provider_name = nonexisting_provider_name
        const provider_data = nonexisting_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toBeNull();
    })

    it('should return null if provided an empty content, and a provider name that doesnt exists in providers even if type is provided not empty (bis)', () => {
        const content = ''
        const type = 'html'
        const provider_name = nonexisting_provider_name
        const provider_data = nonexisting_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toBeNull();
    })

    it('should return data for the correct provider if provided an empty content and a provider that need no data', () => {
        const content = ''
        const type = ''
        const provider_name = nodata_provider_name
        const provider_data = nodata_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toStrictEqual(nodata_expected_content);
    })

    it('should return the formated pattern "example" if provided the "example" provider and data', () => {
        const content = ''
        const type = 'html'
        const provider_name = example_provider_name
        const provider_data = example_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toStrictEqual(example_expected_content);
    })

    it('should return the formated pattern "example" if provided the "example" provider and data even if the content is null and not empty', () => {
        const content = ''
        const type = 'html'
        const provider_name = example_provider_name
        const provider_data = example_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toStrictEqual(example_expected_content);
    })

    it('should return the formated pattern "other" if provided the "other" provider and data', () => {
        const content = ''
        const type = 'html'
        const provider_name = other_provider_name
        const provider_data = other_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toStrictEqual(other_expected_content);
    })

    it('should return the formated pattern "complex" if provided the "complex" provider and data', () => {
        const content = ''
        const type = 'html'
        const provider_name = complex_provider_name
        const provider_data = complex_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toStrictEqual(complex_expected_content);
    })

    it('should return the formated pattern "multiple_js" if provided the "multiple_js" provider and data', () => {
        const content = ''
        const type = 'html'
        const provider_name = multiple_js_provider_name
        const provider_data = multiple_js_provider_data
        const providers = default_providers
        const result = get_analytic_content(content, type, provider_name, provider_data, providers)
        expect(result).toStrictEqual(multiple_js_expected_content);
    })
})