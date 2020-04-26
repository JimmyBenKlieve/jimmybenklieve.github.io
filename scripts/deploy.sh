#! /bin/sh

mv ./build ./un1c0de.xyz

expect -c "
  spawn scp -r ./un1c0de.xyz $REMOTE_USER@$REMOTE_IP:/home
  expect {
    \"yes/no\" { send \"yes\n\"; exp_continue; }
    \"*assword\" { send \"$REMOTE_PASSWORD\n\"; }
  }
  expect eof
"
