# Run Your Socks Off

I made a marathon sign-up form. 
The inspiration for this project came from [Cherry Blossom Run](https://runsignup.com/Race/WA/Seattle/CherryBlossomRun)

to get it started: 
- **npm install**
- **pipenv install && pipenv shell**
- **export FLASK_APP=app.py**
- **export FLASK_RUN_PORT=5555**
- '**flask db upgrade**' to generate your database.
- '**python seed.py**' to populate it.

- in 'client' -> **npm run dev**
- in 'server' -> **python app.py** to run your development server.

<div>
    <a href="https://www.loom.com/share/b059241f27c44ee6acd4fdf31554ee2e">
      <p>Marathon Sign Up Form Walkthrough 🏃‍♂️
### - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/b059241f27c44ee6acd4fdf31554ee2e">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/b059241f27c44ee6acd4fdf31554ee2e-with-play.gif">
    </a>
  </div>
## Future Coding:

Things I'd like to implement in the future include:
- depending on authorization, a user can create new race events. For example a race admin can do this.
- Stripe payment processing to simulate real transaction
- Firebase login and authentication
- Firestore for database 
