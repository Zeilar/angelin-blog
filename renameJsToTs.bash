# convert all the js files to ts files.
for f in server/**/*.js; do
    mv "$f" "${f%.js}.ts"
done
