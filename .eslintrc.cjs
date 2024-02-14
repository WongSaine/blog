module.exports = {
  root: true,
    "env": {
      "browser": true,
      "es2022": true
    },
    "ignorePatterns": [
      "node_modules",
      "dist",
      "build"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "prettier",
      "import"
    ],
    "rules": {
      "indent": [
        "error",
        2,
        {
          "SwitchCase": 1
        }
      ],
      "prettier/prettier": "error",
      "linebreak-style": [
        0,
        "unix"
      ],
      "quotes": [
        "error",
        "single",
        {
          "avoidEscape": true
        }
      ],
      "semi": [
        "error",
        "never"
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-unresolved": [
        2,
        {
          "caseSensitive": false
        }
      ],
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
          ]
        }
      ],
      "import/order": [
        2,
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always"
        }
      ],
      "@typescript-eslint/no-explicit-any": [
        "off"
      ],
      "@typescript-eslint/ban-ts-comment": [
        "off"
      ]
    },
    "settings": {
      "react": {
        "version": "detect"
      },
      "import/parsers": {
        "@typescript-eslint/parser": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      },
      "import/resolver": {
        "node": {
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
          ],
          "moduleDirectory": [
            "node_modules",
            "src/"
          ]
        }
      }
    }
  }
