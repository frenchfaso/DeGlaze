#! /usr/bin/env python

from livereload import Server, shell

server = Server()

# Watch the directory for changes, '.' means the current directory
server.watch('.', shell('echo "Changes detected"'))

# Optionally, you can specify a port. Default is 35729
server.serve(host='0.0.0.0', port=8000, root='.')
