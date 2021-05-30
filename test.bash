# convert all the js files to ts files.
for f in db/**/*.js; do
    mv "$f" "${f%.js}.ts"
done