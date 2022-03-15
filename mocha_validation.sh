files=$( ls ./mochawesome-report )
exitCode = 0
for file in $files; 
do 
    value=`cat ./mochawesome-report/$file`
    hasError=($(jq '.stats.failures > 0' <<< "$value" ))
    echo $hasError
    if [[ "$hasError" == *"true"* ]];
    then 
        jq -r '.results[] | .suites[] | .tests[] | .title' <<< "$value"
        jq -r '.results[] | .suites[] | .tests[] | .err.message' <<< "$value"
        $exitCode=1
done
exit $exitCode