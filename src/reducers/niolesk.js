import get_analytic_content from "./utils/analytics_functions"
import { createReducer } from "./utils/createReducer"

const local_config = window.config || {}
const local_config_analytic_providers = window.config_analytic_providers || {}

export const initialState = {
    analytics: get_analytic_content(
        local_config.analyticsContent,
        local_config.analyticsType,
        local_config.analyticsProviderName,
        [
            local_config.analyticsProviderArg1,
            local_config.analyticsProviderArg2,
            local_config.analyticsProviderArg3,
            local_config.analyticsProviderArg4,
            local_config.analyticsProviderArg5,
            local_config.analyticsProviderArg6,
            local_config.analyticsProviderArg7,
            local_config.analyticsProviderArg8,
            local_config.analyticsProviderArg9,
        ], 
        local_config_analytic_providers
    ),
}

export default createReducer({
}, initialState)
