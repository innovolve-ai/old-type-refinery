#! /bin/bash
set -m

echo "Start Server in Background"
# run the server in background
/opt/typedb-all-linux/typedb server &

echo "Check if db exists"

# seed db if it does not exists
if [[ ! -d "/opt/typedb-all-linux/server/data/${TYPEDB_DB}" ]]; then
    echo "Create DB"
    sleep 5
    
    sed -i "s/pm_4/${TYPEDB_DB}/g" /setup/init.tql

    /opt/typedb-all-linux/typedb console --script /setup/init.tql
fi

echo "Return to foreground"

# bring up the server to foreground
fg