# Gamma function

## Introduction

I first came across this function it must have been in the early 1980s when I was surprizingly much younger than I am now. I have often used it to centre my thoughts on convergence, asymptotic series, and many more mathematical muddles.

So what is the gamma function ($\Gamma$)? Briefly it is a function that on positive integer values that are related to those of the factorial function, $\Gamma(n)=(n-1)!$. In case you don’t know, $2!=2\times1$, $3!=3\times2\times1$, and so on. Symbolically:
$$n!=\prod\limits_{m=1}^nm$$
Just to be cheeky, we also define $0!=1$.

So why not stick with the factorial function. Well, $\Gamma$ is so much more. First, it is not just defined on positive integers. For example, $\Gamma(1/2)=\sqrt\pi$. In fact, it is defined for all finite values apart from at the negative integers and zero. For those familar with the complex plane, $\Gamma$ is defined there too, and is “analytic” (again with the caveat for negative/zero integers).

We start with a definition that allows us to determine, or at least approximate, $\Gamma$ for $x\gt0$ [and, incidentally, at complex $z$ with $\mathrm{Re}(z)\gt0$]:
$$\Gamma(x)=\int\limits_0^\infty t^{x-1}\exp(-t)dt$$

We note that the integral becomes singular at $t=0$ when $0<x<1$. Technically this makes the integral “improper”. I’m not 100% clear whether the infinite limit also makes the integral improper. Something to explore at another time.

A key relation is $\Gamma(x+1)=x\Gamma(x)$, which is the source, among other things, of the equation $\Gamma(n)=(n-1)!$. We can derive this using integration by parts:
$$\begin{aligned}
\Gamma(x+1) =& \int\limits_0^\infty t^x\exp(-t)dt \\
=& [-t^x\exp(-t)]_0^\infty + x\int\limits_0^\infty t^{x-1}\exp(-t)dt \\
=&x\Gamma(x)
\end{aligned}$$
The integrated parts are zero at the two limits (for $x>0$). We also note:
$$\Gamma(1) = \int\limits_0^\infty \exp(-t)dt=[-exp(-t)]_0^\infty = -\exp(-\infty)+\exp(0)=1$$

This relation allows us to continue into negative territory, using $\Gamma(x)=\Gamma(x+1)/x$. This is well-defined for $x>-1$, except for $x=0$. And onwards, $\Gamma(x)=\Gamma(x+2)/[(x+1)x]$, defined for $x>-2$, except for $x=0,-1$. Und so weiter, as the Germans would say.