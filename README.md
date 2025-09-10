# Documentation for the story app:
## Endpoints:
### Auth: 
/api/register   | Post | To register a new user, takes a username, email, and password, sets a cookie with refreshToken and returns an access token;
/api/login        | Post | To login a registered user. Takes an email and a password. Sets a cookie with a refresh token and returns an access token;
/api/refresh     | Post | Uses a refreshToken stored in the cookies to return a new access token

### Stories:
/api/stories  | Get | gets all stories, must have valid access token
/api/stories/me |Get | gets all users stories, must have valid token
/api/stories | Post | Create new story, takes in a title and content in body.
/api/stories/:id | Patch | Update story, must be a contributor or author, takes in either title, or content (or both).
/api/stories/:id | Delete | Deletes story, checks to make sure user is the author 
/api/stories/permission | Get | returns an object with two objects, with story_id’s of stories where user is either author or collaborator

### Contributors: 
/api/contributors | Post | adds a contributor, takes email and story_id and adds as a contributor. Verifies that user is the author
/api/contributors/:story_id | Get | gets all contributors for given story, no body, just needs to be verified
/api/contributors/:id | delete | takes in story_id and deletes contributor for story, only the author can use


## TODO: 
This project is not done yet…
As of now, there is no styling.
Add comments.
Add that you can see authors and contributors, from homepage and story viewer.
More organization for the code, and a lot of cleanup and edge cases. 
Add to ux by adding loaders and error checking.
Add helper function to automatically refresh token. 


## Tables:
###Tables were made with these commands:
CREATE TABLE Users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash TEXT NOT NULL
);

CREATE TABLE Stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT REFERENCES Users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Contributors (
id SERIAL PRIMARY KEY,
story_id INT REFERENCES Stories(id),
user_id INT REFERENCES Users(id)
);
