const Auth = require('./Auth');
const Users = require('./Users');
const BlockedToken = require('./BlockedToken');
const Sellers = require('./Sellers');
const DeliveryPartner = require('./DeliveryPartner');
const Addresses = require('./Addresses');
const CartItems = require('./CartItems');
const Categories = require('./Categories');
const OrderItems = require('./OrderItems');
const Orders = require('./Orders');
const Products = require('./Products');
const ProductSpecification = require('./ProductSpecification');

// Create associations
Auth.hasOne(Users, {foreignKey: 'auth_id'});
Users.belongsTo(Auth, {foreignKey: 'auth_id'});

//Association: DeliveryPartner and Sellers one to many
DeliveryPartner.hasMany(Sellers, { foreignKey: 'delivery_partner_id' });
Sellers.belongsTo(DeliveryPartner, { foreignKey: 'delivery_partner_id' });

//Association: Sellers and Products one to many
Sellers.hasMany(Products, { foreignKey: 'seller_id' });
Products.belongsTo(Sellers, { foreignKey: 'seller_id' });

//Association: Categories and Products one to many
Categories.hasMany(Products, { foreignKey: 'category_id' });
Products.belongsTo(Categories, { foreignKey: 'category_id' });

//Association: Products and ProductSpecification one to many
Products.hasMany(ProductSpecification, { foreignKey: 'product_id' });
ProductSpecification.belongsTo(Products, { foreignKey: 'product_id' });



//Association: Users and Addresses one to many
Auth.hasMany(Addresses, { foreignKey: 'auth_id' });
Addresses.belongsTo(Users, { foreignKey: 'auth_id' });

//Association: Orders and OrderItems one to many
Orders.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });

//Association: Products and OrderItems one to many
Products.hasMany(OrderItems, { foreignKey: 'product_id' });
OrderItems.belongsTo(Products, { foreignKey: 'product_id' });

//Association: Users and Orders one to many
Auth.hasMany(Orders, { foreignKey: 'auth_id' });
Orders.belongsTo(Users, { foreignKey: 'auth_id' });

//Association: Addresses and Orders one to many
Addresses.hasMany(Orders, { foreignKey: 'address_id' });
Orders.belongsTo(Addresses, { foreignKey: 'address_id' });





module.exports = { Auth, BlockedToken, Sellers, DeliveryPartner, Addresses, CartItems, Categories, OrderItems, Orders, Products, ProductSpecification, Users };