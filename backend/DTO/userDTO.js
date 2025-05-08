class UserDTO {
  static success(message, user = null) {
    return {
      success: true,
      message,
      user
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
