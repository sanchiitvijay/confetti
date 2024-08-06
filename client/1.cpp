#include <iostream>
#include <bits/stdc++.h>
using namespace std;

bool comp(int a,int b){
    return a%10<b%10;
}
int main(){
    priority_queue<int,vector<int>,dcltype=comp> pq(comp);
    pq.push(14);
    pq.push(25);
    pq.push(9);
    pq.push(30);

    
    while(!pq.empty()){
        cout<<pq.top()<<endl;
        pq.pop();
    }

}