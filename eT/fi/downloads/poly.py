class Polynomial:
    def __init__(self, coeff):
        self.coeff = coeff
    def eval(self, x):
        result = 0
        for a in self.coeff:
            result = result * x + a
        return result
    def diff(self):
        diffc = []
        n = len(self.coeff) - 1
        N = n
        while n > 0:
            diffc += [n*self.coeff[N-n]]
            n -= 1
        return Polynomial(diffc)

def pDiv(p1, p2):
    p1c = p1.coeff
    p2c = p2.coeff
    if len(p1c) < len(p2c):
        return [Polynomial([0]),p1]
    qc = []
    for m in range(0,len(p1c)-len(p2c)+1):
        qc += [p1c[0]/p2c[0]]
        p1c = p1c[1:]
        for n in range(0,len(p2c)-1):
            p1c[n] = p1c[n]-p2c[n+1]*qc[m]
    while p1c[0]==0 and p1c!=[0]:
        p1c = p1c[1:]
    return [Polynomial(qc),Polynomial(p1c)] # quotient and remainder

def pMul(p1,p2):
    p1c = p1.coeff
    p2c = p2.coeff
    result = []
    for m in range(0,len(p1c)):
        for n in range(0,len(p2c)):
            if ((m+n) == len(result)):
                result += [0]
            result[m+n] += p1c[m]*p2c[n]
    return result