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
      name: 'name',
      message: 'What is your lib name?',
      default: 'name'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      // example: name = demo-user
      this.props.libName = s(this.props.name).slugify().value(); // => demo-user
      this.props.camelLibName = s(this.props.libName).camelize().value(); // => demoUser
      this.props.firstCapCamelLibName = s(this.props.camelLibName).capitalize().value(); // => DemoUser

      scrFolder = 'src';
      scrFolderPath = './' + scrFolder + '/';

    });

  },

  copyTemplates() {

    this.fs.copyTpl(
      path.join(this.templatePath(), 'src.js'),
      path.join(scrFolderPath, this.props.libName + '.js'),
      this.props
    );

    this.fs.copyTpl(
      path.join(this.templatePath(), 'test.js'),
      path.join(scrFolderPath, '..', 'test', 'unit', this.props.libName + '.js'),
      this.props
    );

  },

  usageTip() {
    logger.log('=========================');
    logger.log('Congratulations, completed successfully!');
    logger.log("Gook Luck!");
    logger.log('=========================');
  }

});
