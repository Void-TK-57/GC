class A {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    len() {
        return( this.x + this.y );
    }
}

a = [];

for (i = 0; i < 20; i++) {
    a.push( new A(20 - i, 20 - i) );
}

b = a.reduce( ( min , p) => p.len() < min.len() ? p : min, a[0] );

console.log(b)