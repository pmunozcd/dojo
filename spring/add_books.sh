#!/bin/bash

# Add a book to the library
curl --request POST -sL \
     --url 'http://localhost:9000/books' \
     --header 'Content-Type: application/json' \
     --data '{"title": "The Catcher in the Rye", "author": "J.D. Salinger"}'

# Add another book to the library
curl --request POST -sL \
     --url 'http://localhost:9000/books' \
     --header 'Content-Type: application/json' \
     --data '{"title": "To Kill a Mockingbird", "author": "Harper Lee"}'

# Add another book to the library
curl --request POST -sL \
     --url 'http://localhost:9000/books' \
     --header 'Content-Type: application/json' \
     --data '{"title": "1984", "author": "George Orwell"}'
