#!/usr/bin/env python
# coding: utf-8

def dsieve(ls): # sieve lists to extract prime factors
        [nl, pl, il] = ls
        nxt = nl.count(0) # find next non-zero factor (will be prime number)
        nm = len(nl) # length of lists
        np = nl[nxt] # prime for dividing selected numbers
        st = nxt+2 # step between divisions
        for i in range(nxt,nm,st):
            nl[i] = nl[i]//np # divide selected number by prime
            if not(np in pl[i]): # add prime to prime list if not already present
                pl[i] = pl[i]+[np]
                il[i] = il[i]+[0]
            j = pl[i].index(np) # find position of prime in list
            il[i][j] += 1 # increase index by 1
        nl[nxt] = 0 # sieve complete so zero work list entry
        return [nl, pl, il]

class pflist: # prime factor class constructor
            
    def __init__(self,nmax):
        self.nlist = [i for i in range(2,nmax+1)] # create number list
        wlist = self.nlist.copy() # work list
        self.plist = [[]]*(nmax-1) # list for prime contents
        self.ilist = [[]]*(nmax-1) # list for prime indices
        llist = [wlist, self.plist, self.ilist] # component list for sieve
        while (wlist.count(0)<len(wlist)):
            if(wlist[wlist.count(0)]>1):
                llist = dsieve(llist) # perform sieve step
            else:
                wlist[wlist.count(0)] = 0 # zero leading 1s from work list
    
    def prlists(self): # print lists
        print(self.nlist)
        print(self.plist)
        print(self.ilist)
    
    def html(self, name): # make html file with simple table
        with open(name+".html","w") as html:
            html.write("<html>\n") # html tag
            html.write("<table border =1>\n") # set up table 
            html.write("<tr><td>Number</td><td>Prime factorization</td></tr>\n") # top row with descriptions
            for i in range(0,len(self.nlist)): # output table rows with number and formatted prime factorization
                html.write("<tr><td>"+str(self.nlist[i])+"</td><td>")
                pms = self.plist[i]
                ins = self.ilist[i]
                for j in range(0,len(pms)):
                    html.write(str(pms[j]))
                    html.write("<sup>"+str(ins[j])+"</sup>")
                html.write("</td></tr>\n") # end row
            html.write("</table>\n") # end table
            html.write("</html>") # end html
        

pf = pflist(1000)
pf.html("pf")




