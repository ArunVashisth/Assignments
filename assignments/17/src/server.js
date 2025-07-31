import { createServer, Response } from 'miragejs';

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = 'api';
      let users = [
        // Example: { name: 'Test User', email: 'test@example.com', password: 'password' }
      ];

      this.post('/signup', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { name, email, password } = attrs;
        if (users.find(u => u.email === email)) {
          return new Response(400, {}, { message: 'Email already registered.' });
        }
        const newUser = { name, email, password };
        users.push(newUser);
        return { user: { name, email } };
      });

      this.post('/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { email, password } = attrs;
        const found = users.find(u => u.email === email && u.password === password);
        if (found) {
          return { user: { name: found.name, email: found.email } };
        }
        return new Response(401, {}, { message: 'Invalid login credentials.' });
      });
    },
  });
}
