//PC1
conf t
no ip routing
int f0/0
ip add 201.3.4.1 255.255.255.192
no shut
end
wr


//R3
conf t
int f0/0
ip add 201.3.4.67 255.255.255.192
no shut
int f0/1
ip add 201.3.4.131 255.255.255.192
no shut
int f1/0
ip add 201.3.4.3 255.255.255.192
no shut
router ospf 1
router-id 3.3.3.3
network 201.3.4.0 0.0.0.63 area 4
network 201.3.4.64 0.0.0.63 area 4
network 201.3.4.128 0.0.0.63 area 4
end
wr

//R2
conf t
int f0/0
ip add 201.3.4.194 255.255.255.192
no shut
int f0/1
ip add 201.3.4.130 255.255.255.192
no shut
int s1/0
ip add 201.3.0.194 255.255.255.192
encapsulation ppp
no shut
router ospf 1
router-id 2.2.2.2
network 201.3.4.192 0.0.0.63 area 4
network 201.3.4.128 0.0.0.63 area 4
network 201.3.0.192 0.0.0.63 area 0
end
wr

//R1
conf t
int f0/0
ip add 201.3.4.65 255.255.255.192
no shut
int f0/1
ip add 201.3.4.193 255.255.255.192
no shut
int s1/0
ip add 201.3.0.1 255.255.255.192
encapsulation ppp
no shut
router ospf 1
router-id 1.1.1.1
network 201.3.4.192 0.0.0.63 area 4
network 201.3.4.128 0.0.0.63 area 4
network 201.3.0.0 0.0.0.63 area 0
end
wr


//////////////////////////// FIM AREA 4  ///////////////////////////////////////////


//R4
conf t
int f0/0
ip add 201.3.1.4 255.255.255.0
no shut
int f0/1
ip add 201.3.0.68 255.255.255.192
no shut
int s1/0
ip add 201.3.0.4 255.255.255.192
encapsulation ppp
no shut
router ospf 1
router-id 4.4.4.4
network 201.3.0.64 0.0.0.63 area 0
network 201.3.0.0 0.0.0.63 area 0
network 201.3.1.0 0.0.0.63 area 1
end
wr

////////////////////////////  FIM AREA 1  ///////////////////////////////////////////


//R5
conf t
int f0/0
ip add 201.3.0.69 255.255.255.192
no shut
int f0/1
ip add 201.3.2.5 255.255.255.0
no shut
router ospf 1
router-id 5.5.5.5
network 201.3.0.64 0.0.0.63 area 0
network 201.3.2.0 0.0.0.255 area 2
end
wr

//R6
conf t
int f0/0
ip add 201.3.0.134 255.255.255.192
no shut
int f0/1
ip add 201.3.0.70 255.255.255.192
no shut
int f1/0
ip add 201.3.2.6 255.255.255.0
no shut
router ospf 1
router-id 6.6.6.6
network 201.3.0.128 0.0.0.63 area 0
network 201.3.2.0 0.0.0.255 area 2
network 201.3.0.64 0.0.0.63 area 0
end
wr

//PC6
conf t
no ip routing
int f0/0
ip add 201.3.2.60 255.255.255.0
no shut
end
wr

//PC7
conf t
no ip routing
int f0/0
ip add 201.3.2.70 255.255.255.0
no shut
end
wr



////////////////////////////  FIM AREA 2  ///////////////////////////////////////////


//SwR7
conf t
ip routing
int f0/0
ip add 201.3.0.135 255.255.255.192
no shut
int s2/0
ip add 201.3.0.199 255.255.255.192
encapsulation ppp
no shut
router ospf 1
network 201.3.0.192 0.0.0.192 area 0
network 201.3.0.128 0.0.0.192 area 0
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
ip add 10.0.10.1 255.255.255.192
no shut
int vlan2
ip add 10.0.10.65 255.255.255.192
no shut
int vlan3
ip add 10.0.10.129 255.255.255.192
no shut
end
wr
conf t
service dhcp
ip dhcp pool pool1
network 10.0.10.0 255.255.255.192
dns 10.0.10.1
default-router 10.0.10.1
exit
ip dhcp excluded-address 10.0.10.2
ip dhcp pool pool2
network 10.0.10.64 255.255.255.192
dns 10.0.10.65
default-router 10.0.10.65
exit
ip dhcp excluded-address 10.0.10.66
ip dhcp excluded-address 10.0.10.67
ip dhcp pool pool3
network 10.0.10.128 255.255.255.192
dns 10.0.10.129
default-router 10.0.10.129
exit
ip dhcp excluded-address 10.0.10.130
end
wr
conf t
int vlan1
ip nat inside
int vlan2
ip nat inside
int vlan3
ip nat inside
int f0/0
ip nat outside
int s2/0
ip nat outside
exit
access-list 10 permit 10.0.10.0 0.0.0.63
access-list 10 permit 10.0.10.64 0.0.0.63
access-list 10 permit 10.0.10.128 0.0.0.63
ip nat inside source list 10 int fastEthernet0/0 overload
end
wr


//PC2
conf t
no ip routing
int f0/0
ip add dhcp
no shut
end
wr

//PC3
conf t
no ip routing
int f0/0
ip add dhcp
no shut
end
wr

//PC4
conf t
no ip routing
int f0/0
ip add dhcp
no shut
end
wr

//PC5
conf t
no ip routing
int f0/0
ip add dhcp
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
int vlan 2
ip add 10.0.10.67 255.255.255.192
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
ip add 10.0.10.2 255.255.255.192
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
int vlan 2
ip add 10.0.10.66 255.255.255.192
int vlan 3
ip add 10.0.10.130 255.255.255.192
end
wr



//////////////////////////// FIM AREA 3  ///////////////////////////////////////////