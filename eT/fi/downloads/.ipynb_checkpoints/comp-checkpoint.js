export function Complex(array2) {
    this.re = array2[0];
    this.im = array2[1];
}

export function cstr(z) { return "("+z.re+(z.im<0?"":"+")+z.im+"i)" }
export function cmul(z1,z2) { return new Complex([z1.re*z2.re-z1.im*z2.im, z1.im*z2.re+z1.re*z2.im]) }
export function cadd(z1,z2) { return new Complex([z1.re+z2.re, z1.im+z2.im]) }
export function conj(z1) { return new Complex([z1.re, -z1.im]) }
export function cabs(z1) { return Math.sqrt(z1.re*z1.re+z1.im*z1.im)}
export function carg(z1) { return Math.atan2(z1.im,z1.re) }
export function cinv(z) { var zabs2 = cmul(z,conj(z)).re; return new Complex([z.re/zabs2,-(z.im)/zabs2]) }
export function cdiv(z1,z2) {return cmul(z1,cinv(z2))}
export function creal(x) {return new Complex([x,0])}