# How to run?

1. Install docker on windows. Here is the [tutorial](https://www.youtube.com/watch?v=BMBwyadxokc)
2. Open cmd in current directory and run `docker-compose up` command
3. Then open new tab in cmd and run `npm run start:dev`
4. Open file requests.http in `src/users/requests.http` which contains all the api routes

### TODO:

- [ ] Validate arrays of phone number by country in `update-user.dto.ts`
- [ ] Fix columns order in phpmyadmin/mysql
- [ ] Catch and log errors related to DB query run failed
- [ ] Expose only those values in response which user has sent in request

### Password storage format

`<algorithm>$<iterations>$<salt>$<hash>`
