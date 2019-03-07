#!/bin/bash
set -e

while ! timeout 1 bash -c "echo > /dev/tcp/mysql/3306"
do
    echo "MySQL not responding. Retrying in 5 seconds..."
    sleep 5
done

cd ${ROOT}/shell/twist && ./setup.sh --one-time
rm -rf /run/httpd/* /tmp/httpd*
rm -f /var/run/apache2/apache2.pid

exec /usr/sbin/apache2ctl -D FOREGROUND