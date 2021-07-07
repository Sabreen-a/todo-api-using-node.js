const UserDto = ({ _id, name, email, phoneNumber,address,isAdmin }) => ({
    id: _id,
    name,
    email,
    phone: phoneNumber,
    address,
    isAdmin:isAdmin
  });
  
  module.exports = {UserDto};
  