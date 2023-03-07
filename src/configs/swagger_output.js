export const swagger = {
  swagger: '2.0',
  info: {
    title: 'API for Real Estate APP',
    version: '1.0.0',
    description: 'API for Real Estate APP',
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  tags: [
    {
      name: 'Estate Api',
      description: 'Endpoints',
    },
  ],
  schemes: ['http', 'https'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/order-status/': {
      get: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/roles/': {
      get: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/users/signup': {
      post: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/users/login': {
      post: {
        description: '',
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                email: {
                  example: 'any',
                },
                password: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
      },
    },
    '/users/forgotPassword': {
      post: {
        description: '',
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                email: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
      },
    },
    '/users/resetPassword/{token}': {
      post: {
        description: '',
        parameters: [
          {
            name: 'token',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                password: {
                  example: 'any',
                },
                passwordConfirm: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
      },
    },
    '/users/updateMyPassword': {
      patch: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                passwordCurrent: {
                  example: 'any',
                },
                password: {
                  example: 'any',
                },
                passwordConfirm: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/users/profile': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      patch: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                password: {
                  example: 'any',
                },
                passwordConfirm: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/users/': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/users/{id}': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      delete: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/estate-status/': {
      get: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
  },
};
