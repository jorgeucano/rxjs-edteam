function foo() {
    console.log('EDteam');
    return 42;
}

var x = foo.call();
console.log(x);
var y = foo.call();
console.log(y);