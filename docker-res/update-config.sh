#!/usr/bin/env sh

[ -z "${NIOLESK_KROKI_ENGINE}" ] && NIOLESK_KROKI_ENGINE="https://kroki.io"

CONFIG=$(cat /usr/share/nginx/html/config.js)
CONFIG=$(echo "${CONFIG}" | sed -e 's|krokiEngineUrl: '"'"'.*'"'"'|krokiEngineUrl: '"'${NIOLESK_KROKI_ENGINE}'"'|')
[ -n "${NIOLESK_ANALYTICS_CONTENT}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsContent: '"'"'.*'"'"'|analyticsContent: '"'${NIOLESK_ANALYTICS_CONTENT}'"'|')
[ -n "${NIOLESK_ANALYTICS_TYPE}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsType: '"'"'.*'"'"'|analyticsType: '"'${NIOLESK_ANALYTICS_TYPE}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_NAME}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderName: '"'"'.*'"'"'|analyticsProviderName: '"'${NIOLESK_ANALYTICS_PROVIDER_NAME}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG1}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg1: '"'"'.*'"'"'|analyticsProviderArg1: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG1}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG2}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg2: '"'"'.*'"'"'|analyticsProviderArg2: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG2}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG3}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg3: '"'"'.*'"'"'|analyticsProviderArg3: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG3}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG4}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg4: '"'"'.*'"'"'|analyticsProviderArg4: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG4}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG5}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg5: '"'"'.*'"'"'|analyticsProviderArg5: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG5}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG6}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg6: '"'"'.*'"'"'|analyticsProviderArg6: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG6}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG7}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg7: '"'"'.*'"'"'|analyticsProviderArg7: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG7}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG8}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg8: '"'"'.*'"'"'|analyticsProviderArg8: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG8}'"'|')
[ -n "${NIOLESK_ANALYTICS_PROVIDER_ARG9}" ] && CONFIG=$(echo "${CONFIG}" | sed -e 's|analyticsProviderArg9: '"'"'.*'"'"'|analyticsProviderArg9: '"'${NIOLESK_ANALYTICS_PROVIDER_ARG9}'"'|')
echo "${CONFIG}" > /usr/share/nginx/html/config.js
