
# TM Planning poker

## Installing
```bash
npm install
// Install vue cli globally
npm install -g @vue/cli @vue/cli-service-global
```

## Run
```bash
npm run start
```

## Deploy

```
sudo snap install --classic heroku
heroku login
git remote add heroku https://git.heroku.com/tm-pp.git
git push --force heroku [from:branch]:[to:branch]
```

## Client side structure example:
```
{
    "vote": "",
    "topic": "Some topic",
    "data": {
        "sockets": {
            "/poker#l2p6Mev-a-w3HobGAAAL": "7395b287-78b9-4752-bfb6-55c9527cef4a"
        },
        "users": {
            "7395b287-78b9-4752-bfb6-55c9527cef4a": {
                "name": "oos@ing.dk",
                "uuid": "7395b287-78b9-4752-bfb6-55c9527cef4a",
                "vote": "",
                "voting": true
                }
            },
        "state": {
            "topic": "Some topic",
            "discuss": "discuss"
        }
    },
  "userName": "oos@ing.dk",
  "discuss": "discuss",
  "anyUnVoted": true,
  "timer": {
    "sec": 84,
    "stopped": false,
    "time": "00:01:24",
    "started": true
  },
  "result": {
    "values": {
    "7395b287-78b9-4752-bfb6-55c9527cef4a": 0
    },
    "average": null,
    "recommended": null
  },
  "room": "global",
  "uuid": "7395b287-78b9-4752-bfb6-55c9527cef4a"
}

```