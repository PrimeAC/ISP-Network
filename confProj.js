//PC1
conf t
no ip routing
int f0/0
ip add 222.222.10.100 255.255.255.0
no shut
end
wr


//R3
conf t
int f0/0
ip add 222.222.30.3 255.255.255.0
no shut
int f0/1
ip add 222.222.20.3 255.255.255.0
no shut
int f1/0
ip add 222.222.10.3 255.255.255.0
no shut
router ospf 1
router-id 3.3.3.3
network 222.222.10.0 0.0.0.255 area 4
network 222.222.20.0 0.0.0.255 area 4
network 222.222.30.0 0.0.0.255 area 4
end
wr

//R2
conf t
int f0/0
ip add 222.222.40.2 255.255.255.0
no shut
int f0/1
ip add 222.222.20.2 255.255.255.0
no shut
int s1/0
ip add 222.222.100.2 255.255.255.0
encapsulation ppp
no shut
router ospf 1
router-id 2.2.2.2
network 222.222.20.0 0.0.0.255 area 4
network 222.222.30.0 0.0.0.255 area 4
network 222.222.100.0 0.0.0.255 area 0
end
wr

//R1
conf t
int f0/0
ip add 222.222.30.1 255.255.255.0
no shut
int f0/1
ip add 222.222.40.1 255.255.255.0
no shut
int s1/0
ip add 222.222.50.1 255.255.255.0
encapsulation ppp
no shut
router ospf 1
router-id 1.1.1.1
network 222.222.40.0 0.0.0.255 area 4
network 222.222.30.0 0.0.0.255 area 4
network 222.222.50.0 0.0.0.255 area 0
end
wr


//////////////////////////// FIM AREA 4  ///////////////////////////////////////////


//R4
conf t
int f0/0
ip add 222.222.110.4 255.255.255.0
no shut
int f0/1
ip add 222.222.60.4 255.255.255.0
no shut
int s1/0
ip add 222.222.50.4 255.255.255.0
encapsulation ppp
no shut
router ospf 1
router-id 4.4.4.4
network 222.222.60.0 0.0.0.255 area 0
network 222.222.50.0 0.0.0.255 area 0
network 222.222.110.0 0.0.0.255 area 1
end
wr

////////////////////////////  FIM AREA 1  ///////////////////////////////////////////


//R5
conf t
int f0/0
ip add 222.222.60.5 255.255.255.0
no shut
int f0/1
ip add 222.222.70.5 255.255.255.0
no shut
router ospf 1
router-id 5.5.5.5
network 222.222.60.0 0.0.0.255 area 0
network 222.222.70.0 0.0.0.255 area 2
end
wr

//R6
conf t
int f0/0
ip add 222.222.60.6 255.255.255.0
no shut
int f0/1
ip add 222.222.80.6 255.255.255.0
no shut
int f1/0
ip add 222.222.70.6 255.255.255.0
no shut
router ospf 1
router-id 6.6.6.6
network 222.222.60.0 0.0.0.255 area 0
network 222.222.70.0 0.0.0.255 area 2
network 222.222.80.0 0.0.0.255 area 0
end
wr

//PC6
conf t
no ip routing
int f0/0
ip add 222.222.70.100 255.255.255.0
no shut
end
wr

//PC7
conf t
no ip routing
int f0/0
ip add 222.222.70.101 255.255.255.0
no shut
end
wr



////////////////////////////  FIM AREA 2  ///////////////////////////////////////////


//SwR7
conf t
ip routing
int f0/0
ip add 222.222.80.7 255.255.255.0
no shut
int s2/0
ip add 222.222.100.7 255.255.255.0
encapsulation ppp
no shut
router ospf 1
network 222.222.90.0 0.0.0.255 area 3
network 222.222.91.0 0.0.0.255 area 3
network 222.222.92.0 0.0.0.255 area 3
network 222.222.80.0 0.0.0.255 area 0
network 222.222.100.0 0.0.0.255 area 0
end
wr
vlan database
vlan 2
apply
exit
vlan database
vlan 3
apply
exit
conf t
int f1/0
switchport mode trunk
exit
int f1/1
switchport mode trunk
exit
int vlan1
ip add 222.222.90.7 255.255.255.0
no shut
int vlan2
ip add 222.222.91.7 255.255.255.0
no shut
int vlan3
ip add 222.222.92.7 255.255.255.0
no shut
end
wr

//PC2
conf t
no ip routing
int f0/0
ip add 222.222.90.100 255.255.255.0
no shut
end
wr

//PC3
conf t
no ip routing
int f0/0
ip add 222.222.91.101 255.255.255.0
no shut
end
wr

//PC4
conf t
no ip routing
int f0/0
ip add 222.222.92.102 255.255.255.0
no shut
end
wr

//PC5
conf t
no ip routing
int f0/0
ip add 222.222.91.103 255.255.255.0
no shut
end
wr


//Sw10
vlan database
vlan 2
apply
exit
vlan database
vlan 3
apply
exit
conf t
no ip routing
int f1/0
switchport mode trunk
exit
int f1/1
switchport mode trunk
exit
interface range  fastethernet 1/5 - 9
switchport access vlan 2
exit
interface range  fastethernet 1/10 - 14
switchport access vlan 3
exit
int vlan 1
ip add 222.222.90.10 255.255.255.0
int vlan 2
ip add 222.222.91.10 255.255.255.0
int vlan 3
ip add 222.222.92.10 255.255.255.0
end
wr

//Sw11
vlan database
vlan 2
apply
exit
vlan database
vlan 3
apply
exit
conf t
no ip routing
int f1/0
switchport mode trunk
exit
int f1/1
switchport mode trunk
exit
interface range  fastethernet 1/5 - 9
switchport access vlan 2
exit
interface range  fastethernet 1/10 - 14
switchport access vlan 3
exit
int vlan 1
ip add 222.222.90.11 255.255.255.0
int vlan 2
ip add 222.222.91.11 255.255.255.0
int vlan 3
ip add 222.222.92.11 255.255.255.0
end
wr

//Sw12
vlan database
vlan 2
apply
exit
vlan database
vlan 3
apply
exit
conf t
no ip routing
int f1/0
switchport mode trunk
exit
int f1/1
switchport mode trunk
exit
interface range  fastethernet 1/5 - 9
switchport access vlan 2
exit
interface range  fastethernet 1/10 - 14
switchport access vlan 3
exit
int vlan 1
ip add 222.222.90.12 255.255.255.0
int vlan 2
ip add 222.222.91.12 255.255.255.0
int vlan 3
ip add 222.222.92.12 255.255.255.0
end
wr



//////////////////////////// FIM AREA 3  ///////////////////////////////////////////