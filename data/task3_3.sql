-- TODO Task 3
create database shoppingcart;

use shoppingcart;

create table orders (
   name varchar(128) not null,
   orderId varchar(128) not null,
   date timestamp,
   address text,
   comments text,
   priority boolean,
   cart text,

   primary key(orderId)
);

grant all privileges on shoppingcart.* to fred@'%';

flush privileges;