import sayHello from './draw';

test('should return Hello World!', () => {
    expect(sayHello()).toBe('Hello World!');
});