const context = require.context('../src', true, /\.js$/);

context.keys().forEach(context);

const contextTest = require.context('./', true, /\.spec\.js$/);

contextTest.keys().forEach(contextTest);