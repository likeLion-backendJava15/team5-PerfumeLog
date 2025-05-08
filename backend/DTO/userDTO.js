class UserDTO {
    static success(message, token = null) {
      return {
        success: true,
        message,
        token
      };
    }
  
    static error(message) {
      return {
        success: false,
        message
      };
    }
  }
  
  module.exports = UserDTO;
  