## Convoluted interlude

We indicate convolution of sequences by:

$$(\alpha*\beta)_n=\sum\limits_{k=0}^n\alpha_k\beta_{n-k}$$

We assume the indexes are always non-negative (or $\alpha_n=0$ for $n<0$). Repeated convolution of a single sequence is shown by: $\alpha^{n*}=\alpha^{(n-1)*}*\alpha$, starting from $(\alpha^{0*})_0=1$, and $(\alpha^{0*})_n=0$ otherwise. We are tempted to indicate this sequence as $\alpha^{0*}=\varepsilon$, inspired by group theory where the identity is often denoted as $e$. The $\varepsilon$ sequence is an identity for convolution. We avoid the Kronecker-delta, since we are using $\delta$ for the central difference.

We can consider formal power series $a(z)=\sum\alpha_kz^k$. Taking a power $n$, we find $a(z)^n=\sum \alpha_k^{n*}z^k$, where we abbreviate $\alpha_k^{n*}=(\alpha^{n*})_k$.

We can rewrite the convolution as

$$(\alpha*\beta)_n=\sum\limits_{k+l=n}\alpha_k\beta_{l}$$

We also find in this way:

$$[(\alpha*\beta)*\gamma]_n=\sum\limits_{k+l+m=n}\alpha_k\beta_l\gamma_m$$

The last indicates that the operation is associative, besides being commutative (penultimate equation).

Associativity gives $\alpha^{k*}*\alpha^{l*}=\alpha^{(k+l)*}$

We will be interested in sequences with the condition $\alpha_0=0$. The terms of $\alpha_k^{n*}$ are products of $n$ terms each with index greater than zero, if the result is to be non-zero. But this is impossible if $k<n$.

If $k=n$, all the terms must have index 1, hence $\alpha_n^{n*}=\alpha_1^n$ from the single non-zero term.

When $k>n$, the maximum index $\alpha_m$ that can contribute to $\alpha_k^{n*}$ is when $n-1$ $\alpha_1$’s combine with it. Thus $n-1+m=k\implies m=k-n+1$.