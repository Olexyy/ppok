# ppok
#### Planning pocker

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
git push --force heroku master:master
```