@test "parcel bundle should include necessary code (no tree-shaking)" {
  run grep -q span dist/example.js
  [ "$status" -eq 0 ]
  run grep -q "Click me" dist/example.js
  [ "$status" -eq 0 ]
}


@test "parcel bundle should include unnecessary code (no tree-shaking)" {
  run grep -q blockquote dist/example.js
  [ "$status" -eq 0 ]
}


@test "webpack bundle should include necessary code (tree-shaking)" {
  run grep -q span dist/main.js
  [ "$status" -eq 0 ]
  run grep -q "Click me" dist/main.js
  [ "$status" -eq 0 ]
}


@test "webpack bundle should disclude unnecessary code (tree-shaking)" {
  run grep -q blockquote dist/main.js
  [ "$status" -eq 1 ]
}
