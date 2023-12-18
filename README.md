# Dinner Slot Web
Generate random set from inputed food list.
This application runs on only browser (no backend).
https://yoshikipom.github.io/dinnerslot-web/

## Blog post for this development (Japanese only)
https://tech-yoshikipom.hatenablog.com/entry/2022/03/16/084633

## how to use
- LIST tab
  - input food names separated by line breaks
- SLOT tab
  - input `count` for random set size
  - push `SLOT` button
  - (optional) To change one item, push reload button on the item
  - (optional) push `SHARE BY LINE` button to share the generated list to someone

## run on local
```
yarn install
yarn dev
# access to http://localhost:3000
```

## deploy
Deployment is done by github actions.
The trriger is push to `main` branch.
Please refer `.github/workflows/main.yml`
