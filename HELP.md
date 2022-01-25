$ docker build -t kdo-backend -f backend/Dockerfile backend/
$ docker run -p 8080:80 kdo-backend

$ snap install node --classic
$ npm start

$ docker build -t gift-frontend -f frontend/Dockerfile .
$ docker run -p 8081:80 gift-frontend

docker-compose up

https://reactjs.org
https://fettblog.eu/typescript-react/components/
https://mui.com/components/cards/
https://mui.com/guides/typescript/
https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript
https://reactrouter.com/docs/en/v6/getting-started/overview
https://reactjs.org/community/examples.html
https://nextjs.org

https://medium.com/swlh/typing-next-js-components-using-typescript-2f1d0dc30c4c
https://swr.vercel.app
https://react-query.tanstack.com

npx -p @angular/cli ng new frontend

https://stackblitz.com/run?file=src%2Fapp%2Fhero.service.ts

https://nils-mehlhorn.de/posts/angular-material-pagination-datasource
https://blog.angular-university.io/angular-material-data-table/

docker-compose -f docker-compose.dev.yml up
npx ng serve --open