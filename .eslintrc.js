module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "comma-dangle": ["error", "always-multiline"],
        "func-names": ["error", "never"],
        "no-underscore-dangle": ["error",{ "allow": ["_id","__v","_httpMessage"] }],
        "max-len": ["error", { "code": 200, "tabWidth":4, "ignoreUrls":true, "ignoreTemplateLiterals": true, "ignoreRegExpLiterals":true}],
        "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 5 }],
        "no-param-reassign":1
    },
    "plugins": [
        "import"
    ]
};