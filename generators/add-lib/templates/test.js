import <%= camelLibName %> from '../../src/<%= libName %>';

describe('<%= camelLibName %>', () => {

  // 测试sayHi方法
  describe('sayHi function', () => {
    beforeEach(() => {
      spy(<%= camelLibName %>, 'sayHi');
    });

    it('No Arguments', () => {
      <%= camelLibName %>.sayHi();
      expect(<%= camelLibName %>.sayHi).to.have.returned(sinon.match(value => value.trim() === 'Hello'));
    });

    it('Provide a valid name parameter', () => {
      <%= camelLibName %>.sayHi('daniel');
      expect(<%= camelLibName %>.sayHi).to.have.returned('Hello daniel');
    });

    it('Provate a invalid type name parameter', () => {
      try {
        <%= camelLibName %>.sayHi(1);
      } catch(e) {}
      expect(<%= camelLibName %>.sayHi).to.have.thrown('Error'); // 这里是错误的类型，比如new Error()就是Error，new TypeError()就是TypeError
    })
    // 尽量覆盖所有入参测试用例 - 参数无值情况，参数有效情况，参数无效情况

  });

  // Don't touch me

});
