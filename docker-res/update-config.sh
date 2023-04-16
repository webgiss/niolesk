#!/usr/bin/env sh

[ -z "${NIOLESK_KROKI_ENGINE}" ] && NIOLESK_KROKI_ENGINE="https://kroki.io"

CONFIG=$(cat /usr/share/nginx/html/config.js)
CONFIG=$(echo "${CONFIG}" | sed -e 's|krokiEngineUrl: '"'"'.*'"'"'|krokiEngineUrl: '"'${NIOLESK_KROKI_ENGINE}'"'|')
echo "${CONFIG}" > /usr/share/nginx/html/config.js
