export const errors = {
  CHAR_SIZE_ERR: /([_]*[a-zA-Z]{16,})/,
  NUM_ERR: /[.0-9]+|[0-9.]+/,
  COMMENT_ERR: /({[^\n}]*\n)|(\n[^\n{]*})/,
  PARENTHESIS_ERR: /(\([^\n)]*\n)|(\n[^\n(]*\))/,
  ERR: /[^\s]/
}