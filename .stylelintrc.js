module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  rules: {
    'string-quotes': 'single',
    'at-rule-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
          'local'
        ]
      }
    ]
  }
}