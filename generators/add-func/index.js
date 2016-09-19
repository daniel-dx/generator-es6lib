'use strict';

var _ = require('lodash');
var glob = require("glob");
var path = require('path');
var s = require('underscore.string');
var yeoman = require('yeoman-generator');

var logger = require('../app/logger');
var utils = require('../app/utils');

var scrFolderPath, scrFolder;

module.exports = yeoman.Base.extend({

  prompting() {

    var prompts = [{
      type: 'string',
      name: 'libName',
      message: 'What is your lib name?',
      require: true
    }, {
      type: 'string',
      name: 'funcName',
      message: 'What is your function name?',
      require: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      // example: name = demo-user
      this.props.libName = s(this.props.libName).underscored().slugify().value(); // => demo-user
      this.props.camelLibName = s(this.props.libName).camelize().value(); // => demoUser
      this.props.firstCapCamelLibName = s(this.props.camelLibName).capitalize().value(); // => DemoUser

      this.props.funcName = s(this.props.funcName).underscored().slugify().value(); // => demo-user
      this.props.camelFuncName = s(this.props.funcName).camelize().value(); // => demoUser
      this.props.firstCapCamelFuncName = s(this.props.camelFuncName).capitalize().value(); // => DemoUser
     
      scrFolder = 'src';
      scrFolderPath = './' + scrFolder + '/';

    });

  },


  updateContent() {

    var fullPath = `src/${this.props.libName}.js`;
    utils.rewriteFile({
      fileRelativePath      : fullPath,
      insertPrev: true,
      needle    : "// don't touch me - function",
      splicable : [
        `export function ${this.props.camelFuncName}() {`,
        `  return '';`,
        `}`
      ]
    });
    utils.rewriteFile({
      fileRelativePath      : fullPath,
      insertPrev: true,
      needle    : "// don't touch me - export",
      splicable : [
        `${this.props.camelFuncName},`
      ]
    });

    fullPath = `test/unit/${this.props.libName}.js`;
    utils.rewriteFile({
      fileRelativePath      : fullPath,
      insertPrev: true,
      needle    : "// Don't touch me",
      splicable : [
        `// 测试${this.props.camelFuncName}方法`,
        `describe('${this.props.camelFuncName} function', () => {`,
        `  beforeEach(() => {`,
        `    spy(${this.props.camelLibName}, '${this.props.camelFuncName}');`,
        `  });`,
        ``,
        `  it('No Arguments', () => {`,
        `    ${this.props.camelLibName}.${this.props.camelFuncName}();`,
        `    expect(${this.props.camelLibName}.${this.props.camelFuncName}).to.have.returned('');`,
        `  });`,
        ``,
        `  // 尽量覆盖所有入参测试用例 - 参数无值情况，参数有效情况，参数无效情况`,
        ``,
        `});`,
      ]
    });

  },

  usageTip() {
    logger.log('=========================');
    logger.log('Congratulations, completed successfully!');
    logger.log("Gook Luck!");
    logger.log('=========================');
  }

});
