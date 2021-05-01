#!/usr/bin/env sh

[ -z "${NIOLESK_KROKI_ENGINE}" ] && NIOLESK_KROKI_ENGINE="https://kroki.io"
sed -i -e 's|krokiEngineUrl: '"'"'.*'"'"'|krokiEngineUrl: '"'${NIOLESK_KROKI_ENGINE}'"'|' /usr/share/nginx/html/config.js
