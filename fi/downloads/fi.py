#!/usr/bin/env python
# coding: utf-8

import numpy.polynomial.polynomial as p
import scipy.linalg as la
import numpy as np

glist = input("Change default g list [0.25,0.75,1]? (return/new list): ") or "[0.25,0.75,1]"
glist = glist.strip('[]').split(',')
g = [float(x) for x in glist]   
    

rg = g[::-1] # reverse list for Polynomial class definition

characteristic = p.Polynomial(rg+[-1])

croots = characteristic.roots() # find roots of characteristic solutions

# generate infection, forward and backward lists of characteristic powers

I = [1] # begin creation of infection list - 1 on day 0

forwardlist = [[1]*len(croots)] # list of zero powers of characteristic roots (i.e. 1)
backlist = forwardlist.copy()

for n in range(1,50):
    I = I + [0]
    for m in range(0,len(g)):
        if (n-m-1 >= 0): I[n] = I[n] + g[m]*I[n-m-1] # ensure that list indices remain non-negative
    forwardlist = forwardlist + [[forwardlist[n-1][m]*croots[m] for m in range(0,len(croots))]]
    backlist = backlist + [[backlist[n-1][m]/croots[m] for m in range(0,len(croots))]]

# make matrix of predictions from roots

pmatrix = forwardlist[0:len(croots)]

pc = la.solve(np.array(pmatrix),np.array(I[0:len(croots)]))

P = np.array(forwardlist)@pc # prediction list

B = np.array(backlist)@pc # retro list
    
D = list(range(0,50)) # day list

with open((input("File name? ") or "fi")+".csv","w") as fi:
    gs = str(g).strip('[]')
    fi.write("g list:, {}\n".format(gs))
    fi.write("Date, Infection, Prediction, Retrodiction\n")
    nf = input("Number format? (Default .3f): ") or ".3f"
    ns = "{0:}, {1:}, {1:}, {1:}\n".format("{:n}","{:"+nf+"}")
    for n in range(0,50):
        fi.write(ns.format(D[n], I[n], P[n].real, B[n].real))





